import mongoose, { Schema } from "mongoose";

const donationSchema = new Schema(
  {
    foodName: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    expiryTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "AVAILABLE",
        "RESERVED",
        "ASSIGNED",
        "PICKED",
        "DELIVERED",
        "EXPIRED",
      ],
      default: "AVAILABLE",
    },

    donor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // HOTEL
    },

    reservedBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // NGO
    },

    volunteer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    pickupLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    scheduledAt: {
      type: Date,
    },
    isExpiryAlertSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

donationSchema.index({ pickupLocation: "2dsphere" });

export const Donation = mongoose.model("Donation", donationSchema);
