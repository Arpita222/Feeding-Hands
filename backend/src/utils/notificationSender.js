import { Notification } from "../models/notification.model.js";
import { io } from "../index.js";

const sendNotification = async ({ userId, title, message, type }) => {
  const notification = await Notification.create({
    user: userId,
    title,
    message,
    type,
  });

  //send real-time event
  io.to(userId.toString()).emit("newNotification", notification);

  return notification;
};

export { sendNotification };
