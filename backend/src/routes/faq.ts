import { Router } from "express";

import { bulkSyncFaqs, createFaq, deleteFaq, getFaqsByPage } from "../controllers/faq";
import {
  deleteFaqValidator,
  getFaqValidator,
  postFaqValidator,
  putFaqValidator,
} from "../validators/faq";

const router = Router();

router.post("/create", postFaqValidator, createFaq);
router.get("/", getFaqValidator, getFaqsByPage);
router.put("/", putFaqValidator, bulkSyncFaqs);
router.delete("/:id", deleteFaqValidator, deleteFaq);

export default router;
