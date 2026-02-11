import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema(
  {
    donor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
    },

    discount: {
      type: Number,
      default: 10,
    },

    isRedeemed: {
      type: Boolean,
      default: false,
    },

    redeemedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Coupon = mongoose.model("Coupon", couponSchema);
