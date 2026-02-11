import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

import {
  donateMoney,
  getMyCoupons,
  getMyImpact,
} from "../controllers/donor.controller.js";

const router = Router();

router
  .route("/donate-money")
  .post(verifyJWT, authorizeRoles("DONOR"), donateMoney);

router
  .route("/coupons")
  .get(verifyJWT, authorizeRoles("DONOR"), getMyCoupons);

router
  .route("/impact")
  .get(verifyJWT, authorizeRoles("DONOR"), getMyImpact);

export default router;
