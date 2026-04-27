import { Router } from "express";

import * as NewsletterController from "../controllers/newsletters";
import * as Validators from "../validators/newsletters";

const router = Router();

router.get("/all", NewsletterController.getAllNewsletters);
router.patch("/:id/views", Validators.incrementNewsletterViews);

router.post("/", Validators.createNewsletter, NewsletterController.createNewsletter);

router.put("/:id", Validators.updateNewsletter, NewsletterController.updateNewsletter);

router.delete("/:id", Validators.deleteNewsletter, NewsletterController.deleteNewsletter);

export default router;
