import { Router } from "express";

import * as CityController from "../controllers/cities";
import { verifyAuthToken } from "../validators/auth";
import * as CityValidator from "../validators/cities";

const router = Router();

router.get("/all", CityController.getAllCities);

router.put("/", verifyAuthToken, CityValidator.updateCitiesValidation, CityController.updateCities);

export default router;
