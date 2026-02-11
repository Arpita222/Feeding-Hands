import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../controllers/notification.controller.js";

const router = Router();

// GET MY NOTIFICATIONS
router.route("/").get(verifyJWT, getMyNotifications);

// MARK ONE AS READ

router.route("/:id/read").patch(verifyJWT, markNotificationAsRead);

// MARK ALL AS READ
router.route("/read-all").patch(verifyJWT, markAllNotificationsAsRead);

export default router;
