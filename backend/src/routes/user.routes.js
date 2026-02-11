import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser,getCurrentUser,getAllUsers } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// public routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)

import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { getAllVolunteers } from "../controllers/user.controller.js";
//secure routes
router.route("/logout")
.post(
    verifyJWT,
    authorizeRoles("ADMIN", "HOTEL", "NGO", "VOLUNTEER", "DONOR"),
    logoutUser
);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router
  .route("/volunteers")
  .get(verifyJWT, authorizeRoles("ADMIN"), getAllVolunteers);

router.route("/all-users").get(verifyJWT, authorizeRoles("ADMIN"), getAllUsers)

  
export default router