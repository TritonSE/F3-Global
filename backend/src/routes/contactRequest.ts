import express from "express";

import { handleContactRequest } from "../controllers/contactRequest";

const router = express.Router();
router.post("/contact", handleContactRequest);

export default router;
