import cron from "node-cron";
import { Donation } from "../models/donation.model.js";
import { User } from "../models/user.model.js";
import { sendNotification } from "../utils/notificationSender.js";

/*
========================
CRON JOB → DONATION EXPIRY ALERT
========================
This job runs every 5 minutes and checks if any donation is expiring in 1 hour.
========================
*/

const startCronJobs = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      console.log("Cron job running: Checking expiring donations...");

      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

      const expiringDonations = await Donation.find({
        status: "AVAILABLE",
        isExpiryAlertSent: false,
        expiryTime: { $gte: now, $lte: oneHourLater },
      });

      if (!expiringDonations.length) {
        console.log("No expiring donations found");
        return;
      }

      const ngoUsers = await User.find({ role: "NGO" });
      const volunteerUsers = await User.find({ role: "VOLUNTEER" });

      for (const donation of expiringDonations) {
        for (const ngo of ngoUsers) {
          await sendNotification({
            userId: ngo._id,
            title: "Donation Expiring Soon",
            message: `Food donation "${donation.foodName}" is expiring within 1 hour.`,
            type: "ALERT",
          });
        }

        for (const volunteer of volunteerUsers) {
          await sendNotification({
            userId: volunteer._id,
            title: "Donation Expiring Soon",
            message: `Pickup required! Donation "${donation.foodName}" expires within 1 hour.`,
            type: "ALERT",
          });
        }

        //mark alert as sent so it won't send again
        donation.isExpiryAlertSent = true;
        await donation.save();
      }

      console.log("Expiry notifications sent successfully");
    } catch (error) {
      console.log("Cron job error:", error.message);
    }
  });
};

export { startCronJobs };
