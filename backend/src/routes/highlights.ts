import { Router } from "express";

import * as HighlightsController from "../controllers/highlights";
import { UpdateHighlightValidation } from "../validators/highlights";

const router = Router();

router.get("/", HighlightsController.GetHighlights);
router.put("/", UpdateHighlightValidation, HighlightsController.UpdateHighlights);

export default router;
