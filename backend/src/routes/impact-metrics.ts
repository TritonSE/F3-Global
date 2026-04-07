import { Router } from "express";

import * as ImpactMetricController from "../controllers/impact-metric";
import { verifyAuthToken } from "../validators/auth";
import * as Validators from "../validators/impact-metric";

const router = Router();

router.get("/", ImpactMetricController.getImpactMetric);

router.put(
  "/",
  verifyAuthToken,
  Validators.updateImpactMetric,
  ImpactMetricController.updateImpactMetric,
);

export default router;
