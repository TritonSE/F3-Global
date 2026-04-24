import { Router } from "express";

import {
  createTimeline,
  deleteTimeline,
  getTimeline,
  updateTimeline,
} from "../controllers/timeline";
import { verifyAuthToken } from "../validators/auth";
import {
  createTimelineValidator,
  deleteTimelineValidator,
  updateTimelineValidator,
} from "../validators/timeline";

const router = Router();

router.post("/", verifyAuthToken, createTimelineValidator, createTimeline);
router.put("/", verifyAuthToken, updateTimelineValidator, updateTimeline);
router.get("/all", getTimeline);
router.delete("/:id", verifyAuthToken, deleteTimelineValidator, deleteTimeline);

export default router;
