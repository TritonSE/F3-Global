import { Router } from "express";

import {
  createTimeline,
  deleteTimeline,
  getTimeline,
  updateTimeline,
} from "../controllers/timeline";
import {
  createTimelineValidator,
  deleteTimelineValidator,
  updateTimelineValidator,
} from "../validators/timeline";

const router = Router();

router.post("/", createTimelineValidator, createTimeline);
router.put("/", updateTimelineValidator, updateTimeline);
router.get("/all", getTimeline);
router.delete("/:id", deleteTimelineValidator, deleteTimeline);

export default router;
