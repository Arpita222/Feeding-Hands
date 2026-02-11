import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { MoneyDonation } from "../models/moneyDonation.model.js";
import { Coupon } from "../models/coupon.model.js";

const generateCouponCode = () => {
  return "CPN-" + Math.random().toString(36).substring(2, 10).toUpperCase();
};

// DONOR → DONATE MONEY
const donateMoney = asyncHandler(async (req, res) => {
  const { amount, paymentMethod } = req.body;

  if (!amount) {
    throw new ApiError(400, "Amount is required");
  }

  if (amount <= 0) {
    throw new ApiError(400, "Amount must be greater than 0");
  }

  const donation = await MoneyDonation.create({
    donor: req.user._id,
    amount,
    paymentMethod,
    status: "SUCCESS",
  });

  // Coupon logic: every donation creates coupon
  const coupon = await Coupon.create({
    donor: req.user._id,
    code: generateCouponCode(),
    discount: 10,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { donation, coupon },
        "Money donated successfully and coupon generated"
      )
    );
});

// DONOR → GET MY COUPONS
const getMyCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({ donor: req.user._id }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, coupons, "Coupons fetched successfully"));
});

// DONOR → GET MY IMPACT
const getMyImpact = asyncHandler(async (req, res) => {
  const totalMoneyDonated = await MoneyDonation.aggregate([
    { $match: { donor: req.user._id } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalCoupons = await Coupon.countDocuments({ donor: req.user._id });

  const redeemedCoupons = await Coupon.countDocuments({
    donor: req.user._id,
    isRedeemed: true,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalMoney: totalMoneyDonated[0]?.total || 0,
        totalCoupons,
        redeemedCoupons,
      },
      "Donor impact fetched successfully"
    )
  );
});

export { donateMoney, getMyCoupons, getMyImpact };
