import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Donation } from "../models/donation.model.js";
import { sendNotification } from "../utils/notificationSender.js";

// HOTEL → CREATE DONATION 
import { User } from "../models/user.model.js";   // add this import

const createDonation = asyncHandler(async (req, res) => {
  const { foodName, quantity, expiryTime, pickupLocation } = req.body;

  if (!foodName || !quantity || !expiryTime || !pickupLocation) {
    throw new ApiError(400, "All fields are required");
  }

  const donation = await Donation.create({
    foodName,
    quantity,
    expiryTime,
    pickupLocation,
    donor: req.user._id,
  });

  if (!donation) {
    throw new ApiError(500, "Donation could not be created");
  }

  // 🔥 Notify all NGOs
  const ngoUsers = await User.find({ role: "NGO" }).select("_id");

  for (const ngo of ngoUsers) {
    await sendNotification({
      userId: ngo._id,
      title: "New Donation Available",
      message: `New donation "${donation.foodName}" is available for pickup.`,
      type: "DONATION",
    });
  }

  return res
    .status(201)
    .json(new ApiResponse(201, donation, "Donation created successfully"));
});


// HOTEL → GET OWN DONATIONS
const getMyDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find({
    donor: req.user._id,
  }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, donations, "Your donations fetched successfully")
    );
});

// NGO → GET AVAILABLE DONATIONS
const getAvailableDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find({
    status: "AVAILABLE",
    expiryTime: { $gt: new Date() },
  })
    .populate("donor", "fullname email")
    .sort({ expiryTime: 1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        donations,
        "Available donations fetched successfully"
      )
    );
});

// NGO → ACCEPT DONATION
const acceptDonation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const donation = await Donation.findById(id);

  if (!donation) {
    throw new ApiError(404, "Donation not found");
  }

  if (donation.status !== "AVAILABLE") {
    throw new ApiError(400, "Donation is not available");
  }

  donation.status = "RESERVED";
  donation.reservedBy = req.user._id; // NGO
  await donation.save();

  await sendNotification({
    userId: donation.donor,
    title: "Donation Accepted",
    message: "Your donation has been accepted by an NGO.",
    type: "DONATION",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, donation, "Donation accepted successfully"));
});

// VOLUNTEER → ASSIGNED DONATIONS
const getAssignedDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find({
    volunteer: req.user._id,
  }).populate("donor reservedBy", "fullname email");

  return res
    .status(200)
    .json(
      new ApiResponse(200, donations, "Assigned donations fetched successfully")
    );
});

// ADMIN → GET ALL DONATIONS
const getAllDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find({})
    .populate("donor reservedBy volunteer", "fullname email role")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, donations, "All donations fetched successfully")
    );
});

// ADMIN → ASSIGN VOLUNTEER
const assignVolunteer = asyncHandler(async (req, res) => {
  const { donationId, volunteerId } = req.body;

  if (!donationId || !volunteerId) {
    throw new ApiError(400, "Donation ID and Volunteer ID are required");
  }

  const donation = await Donation.findById(donationId);

  if (!donation) {
    throw new ApiError(404, "Donation not found");
  }

  if (donation.status !== "RESERVED") {
    throw new ApiError(
      400,
      "Only reserved donations can be assigned to volunteer"
    );
  }

  donation.volunteer = volunteerId;
  donation.status = "ASSIGNED";

  await donation.save();

  return res
    .status(200)
    .json(new ApiResponse(200, donation, "Volunteer assigned successfully"));
});

// VOLUNTEER → PICK DONATION
const pickDonation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const donation = await Donation.findById(id);

  if (!donation) {
    throw new ApiError(404, "Donation not found");
  }

  if (donation.status !== "ASSIGNED") {
    throw new ApiError(400, "Donation is not assigned yet");
  }

  //check volunteer is same or not
  if (!donation.volunteer) {
    throw new ApiError(400, "Volunteer is not assigned to this donation");
  }

  if (donation.volunteer.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not assigned to pick this donation");
  }

  donation.status = "PICKED";
  await donation.save();

  return res
    .status(200)
    .json(new ApiResponse(200, donation, "Donation picked successfully"));
});

// NGO → MARK DONATION DELIVERED

const deliverDonation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const donation = await Donation.findById(id);

  if (!donation) {
    throw new ApiError(404, "Donation not found");
  }

  if (donation.status !== "PICKED") {
    throw new ApiError(400, "Donation is not picked yet");
  }

  //check ngo is same or not
  if (!donation.reservedBy) {
    throw new ApiError(400, "This donation is not reserved by any NGO");
  }

  if (donation.reservedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to deliver this donation");
  }

  donation.status = "DELIVERED";
  await donation.save();

  return res
    .status(200)
    .json(new ApiResponse(200, donation, "Donation delivered successfully"));
});

// NGO → GET RESERVED / PICKED DONATIONS (MY REQUESTS)
const getNgoRequests = asyncHandler(async (req, res) => {
  const donations = await Donation.find({
    reservedBy: req.user._id,
    status: { $in: ["RESERVED", "ASSIGNED", "PICKED", "DELIVERED"] },
  })
    .populate("donor volunteer", "fullname email role")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, donations, "NGO requests fetched successfully"));
});

export {
  createDonation,
  getMyDonations,
  getAvailableDonations,
  acceptDonation,
  getAssignedDonations,
  getAllDonations,
  assignVolunteer,
  pickDonation,
  deliverDonation,
  getNgoRequests,
};
