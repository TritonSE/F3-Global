import express from "express";

import * as CollegeController from "../controllers/college";
import * as CollegeValidator from "../validators/college";

const router = express.Router();

router.get("/all", CollegeController.getAllColleges);
router.post("/", CollegeValidator.createCollegeValidator, CollegeController.createCollege);
router.put("/", CollegeValidator.updateCollegesValidator, CollegeController.updateColleges);
router.delete("/:id", CollegeValidator.deleteCollegeValidator, CollegeController.deleteCollege);

export default router;
