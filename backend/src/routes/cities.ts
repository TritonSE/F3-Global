import { Router } from "express";

import * as CityController from "../controllers/cities";
import * as CityValidator from "../validators/cities";

const router = Router();

router.get("/all", CityController.getAllCities);

router.put("/", CityValidator.updateCitiesValidation, CityController.updateCities);

export default router;
