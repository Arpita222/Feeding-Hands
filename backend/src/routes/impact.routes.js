import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import {
  getGlobalImpact,
  getPersonalImpact,
} from "../controllers/impact.controller.js";

const router = Router();

// ADMIN → GLOBAL IMPACT
router
  .route("/global")
  .get(verifyJWT, authorizeRoles("ADMIN"), getGlobalImpact);

// USER → PERSONAL IMPACT
router
  .route("/personal")
  .get(
    verifyJWT,
    authorizeRoles("HOTEL", "NGO", "VOLUNTEER"),
    getPersonalImpact
  );

export default router;
