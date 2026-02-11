import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Donation } from "../models/donation.model.js";

// ADMIN → GLOBAL IMPACT
const getGlobalImpact = asyncHandler(async (req, res) => {
  const totalDonations = await Donation.countDocuments();

  const deliveredDonations = await Donation.countDocuments({
    status: "DELIVERED",
  });

  const activeDonations = await Donation.countDocuments({
    status: { $in: ["AVAILABLE", "RESERVED", "ASSIGNED", "PICKED"] },
  });

  const expiredDonations = await Donation.countDocuments({
    status: "EXPIRED",
  });

  //total meals donated (quantity sum)
  const totalMealsData = await Donation.aggregate([
    {
      $group: {
        _id: null,
        totalMeals: { $sum: "$quantity" },
      },
    },
  ]);

  const totalMeals = totalMealsData.length > 0 ? totalMealsData[0].totalMeals : 0;

  //total meals delivered
  const deliveredMealsData = await Donation.aggregate([
    {
      $match: { status: "DELIVERED" },
    },
    {
      $group: {
        _id: null,
        deliveredMeals: { $sum: "$quantity" },
      },
    },
  ]);

  const deliveredMeals =
    deliveredMealsData.length > 0 ? deliveredMealsData[0].deliveredMeals : 0;

  const impactData = {
    totalDonations,
    deliveredDonations,
    activeDonations,
    expiredDonations,
    totalMeals,
    deliveredMeals,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, impactData, "Global impact fetched successfully"));
});

// USER → PERSONAL IMPACT
const getPersonalImpact = asyncHandler(async (req, res) => {
  const userRole = req.user.role;

  let filter = {};

  //HOTEL impact
  if (userRole === "HOTEL") {
    filter = { donor: req.user._id };
  }

  //NGO impact
  if (userRole === "NGO") {
    filter = { reservedBy: req.user._id };
  }

  //VOLUNTEER impact
  if (userRole === "VOLUNTEER") {
    filter = { volunteer: req.user._id };
  }

  //DONOR impact (for money donations later)
  if (userRole === "DONOR") {
    throw new ApiError(400, "No personal impact available for DONOR yet");
  }

  //ADMIN should use global impact route
  if (userRole === "ADMIN") {
    throw new ApiError(400, "Admin should use global impact API");
  }

  const totalDonations = await Donation.countDocuments(filter);

  const deliveredDonations = await Donation.countDocuments({
    ...filter,
    status: "DELIVERED",
  });

  const activeDonations = await Donation.countDocuments({
    ...filter,
    status: { $in: ["AVAILABLE", "RESERVED", "ASSIGNED", "PICKED"] },
  });

  const totalMealsData = await Donation.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: null,
        totalMeals: { $sum: "$quantity" },
      },
    },
  ]);

  const totalMeals = totalMealsData.length > 0 ? totalMealsData[0].totalMeals : 0;

  const deliveredMealsData = await Donation.aggregate([
    {
      $match: { ...filter, status: "DELIVERED" },
    },
    {
      $group: {
        _id: null,
        deliveredMeals: { $sum: "$quantity" },
      },
    },
  ]);

  const deliveredMeals =
    deliveredMealsData.length > 0 ? deliveredMealsData[0].deliveredMeals : 0;

  const impactData = {
    role: userRole,
    totalDonations,
    deliveredDonations,
    activeDonations,
    totalMeals,
    deliveredMeals,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, impactData, "Personal impact fetched successfully")
    );
});

export { getGlobalImpact, getPersonalImpact };
