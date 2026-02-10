import express from "express";

import { handleContactRequest } from "../controllers/contactRequest";
import { contactRequestValidators } from "../validators/contactRequest";

const router = express.Router();
router.post("/", contactRequestValidators, handleContactRequest);

export default router;
