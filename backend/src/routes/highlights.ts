import { Router } from "express";

import * as HighlightsController from "../controllers/highlights";
import { verifyAuthToken } from "../validators/auth";
import { UpdateHighlightValidation } from "../validators/highlights";

const router = Router();

router.get("/", HighlightsController.GetHighlights);
router.put("/", verifyAuthToken, UpdateHighlightValidation, HighlightsController.UpdateHighlights);

export default router;
