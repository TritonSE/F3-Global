import { Router } from "express";

import * as NewsletterController from "../controllers/newsletters";
import { verifyAuthToken } from "../validators/auth";
import * as Validators from "../validators/newsletters";

const router = Router();

router.get("/", NewsletterController.getNewsletters);

router.get("/:id", Validators.getNewsletterById, NewsletterController.getNewsletterById);

router.patch(
  "/:id/views",
  Validators.incrementNewsletterViews,
  NewsletterController.incrementNewsletterViews,
);

router.post(
  "/",
  verifyAuthToken,
  Validators.createNewsletter,
  NewsletterController.createNewsletter,
);

router.put(
  "/:id",
  verifyAuthToken,
  Validators.updateNewsletter,
  NewsletterController.updateNewsletter,
);

router.delete(
  "/:id",
  verifyAuthToken,
  Validators.deleteNewsletter,
  NewsletterController.deleteNewsletter,
);

export default router;
