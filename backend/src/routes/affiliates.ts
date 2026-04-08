import { Router } from "express";

import * as AffiliateController from "../controllers/affiliate";
import * as Validators from "../validators/affiliate";

const router = Router();

router.get("/all", AffiliateController.getAllAffiliates);
router.get("/", AffiliateController.getAllAffiliates);

router.post("/", Validators.createAffiliateValidator, AffiliateController.createAffiliate);

router.put("/", Validators.updateAffiliatesValidator, AffiliateController.updateAffiliates);

router.delete("/:id", Validators.deleteAffiliateValidator, AffiliateController.deleteAffiliates);

export default router;
