import { Router } from "express";

import * as AffiliateController from "../controllers/affiliate";
import * as Validators from "../validators/affiliate";
import { verifyAuthToken } from "../validators/auth";

const router = Router();

router.get("/all", AffiliateController.getAllAffiliates);
router.get("/", AffiliateController.getAllAffiliates);

router.post(
  "/",
  verifyAuthToken,
  Validators.createAffiliateValidator,
  AffiliateController.createAffiliate,
);

router.put(
  "/",
  verifyAuthToken,
  Validators.updateAffiliatesValidator,
  AffiliateController.updateAffiliates,
);

router.delete(
  "/:id",
  verifyAuthToken,
  Validators.deleteAffiliateValidator,
  AffiliateController.deleteAffiliates,
);

export default router;
