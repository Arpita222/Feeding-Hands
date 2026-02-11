import mongoose, { Schema } from "mongoose";

const moneyDonationSchema = new Schema(
  {
    donor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "CARD", "NETBANKING", "CASH"],
      default: "UPI",
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "SUCCESS",
    },
  },
  { timestamps: true }
);

export const MoneyDonation = mongoose.model("MoneyDonation", moneyDonationSchema);
