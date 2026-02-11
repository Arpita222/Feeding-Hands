import { Router } from "express";
import {
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
} from "../controllers/donation.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

const router = Router();

// HOTEL ROUTES
router
  .route("/")
  .post(verifyJWT, authorizeRoles("HOTEL"), createDonation);

router
  .route("/my")
  .get(verifyJWT, authorizeRoles("HOTEL"), getMyDonations);

// NGO ROUTES
router
  .route("/available")
  .get(verifyJWT, authorizeRoles("NGO"), getAvailableDonations);

// NGO → GET MY REQUESTS
router
  .route("/ngo-requests")
  .get(verifyJWT, authorizeRoles("NGO"), getNgoRequests);


router
  .route("/:id/accept")
  .patch(verifyJWT, authorizeRoles("NGO"), acceptDonation);

// VOLUNTEER ROUTES
router
  .route("/assigned")
  .get(verifyJWT, authorizeRoles("VOLUNTEER"), getAssignedDonations);

// ADMIN ROUTES
router
  .route("/all")
  .get(verifyJWT, authorizeRoles("ADMIN"), getAllDonations);

// ADMIN → ASSIGN VOLUNTEER
router
  .route("/assign-volunteer")
  .patch(
    verifyJWT,
    authorizeRoles("ADMIN"),
    assignVolunteer
  );

// VOLUNTEER → PICK DONATION
router
  .route("/:id/pick")
  .patch(verifyJWT, authorizeRoles("VOLUNTEER"), pickDonation);

// NGO → DELIVER DONATION
router
  .route("/:id/deliver")
  .patch(verifyJWT, authorizeRoles("NGO"), deliverDonation);



export default router;

