import { Router } from "express";

import { bulkWriteFaqs, createFaq, deleteFaq, getFaqsByPage } from "../controllers/faq";
import { verifyAuthToken } from "../validators/auth";
import {
  deleteFaqValidator,
  getFaqValidator,
  postFaqValidator,
  putFaqValidator,
} from "../validators/faq";

const router = Router();

router.post("/create", verifyAuthToken, postFaqValidator, createFaq);
router.get("/", getFaqValidator, getFaqsByPage);
router.put("/", verifyAuthToken, putFaqValidator, bulkWriteFaqs);
router.delete("/:id", verifyAuthToken, deleteFaqValidator, deleteFaq);

export default router;
