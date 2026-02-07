import { Router } from "express";

import * as ClientController from "../controllers/client";
import { verifyAuthToken } from "../validators/auth";
import * as ClientValidator from "../validators/client";

const router = Router();

router.get("/all", [verifyAuthToken], ClientController.getAllClients);

router.post(
  "/create",
  [verifyAuthToken],
  ClientValidator.createClientValidation,
  ClientController.createClient,
);

router.delete("/:id", [verifyAuthToken], ClientController.removeClient);

export default router;
