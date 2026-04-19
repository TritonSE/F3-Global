import express from "express";

import * as CollegeController from "../controllers/college";
import { verifyAuthToken } from "../validators/auth";
import * as CollegeValidator from "../validators/college";

const router = express.Router();

router.get("/all", CollegeController.getAllColleges);
router.get("/", CollegeController.getAllColleges);
router.post(
  "/",
  verifyAuthToken,
  CollegeValidator.createCollegeValidator,
  CollegeController.createCollege,
);
router.put(
  "/",
  verifyAuthToken,
  CollegeValidator.updateCollegesValidator,
  CollegeController.updateColleges,
);
router.delete(
  "/:id",
  verifyAuthToken,
  CollegeValidator.deleteCollegeValidator,
  CollegeController.deleteCollege,
);

export default router;
