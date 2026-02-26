import { Router } from "express";

import * as FAQController from "../controllers/faq";
import * as Validators from "../validators/faq";

const router = Router();

router.post("/create", Validators.createFaqValidators, FAQController.createFAQ);
router.get("/", Validators.getFaqValidator, FAQController.getFaqs);
router.put("/", Validators.putFaqValidators, FAQController.updateFaq);
router.delete("/:id", Validators.deleteFaqValidators, FAQController.deleteFaq);

export default router;
