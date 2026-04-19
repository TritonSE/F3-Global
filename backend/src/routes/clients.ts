import { Router } from "express";

import * as ClientController from "../controllers/client";
import { verifyAuthToken } from "../validators/auth";
import * as ClientValidator from "../validators/client";

const router = Router();

router.get("/all", ClientController.getAllClients);

router.post("/", verifyAuthToken, ClientValidator.createClientValidation, ClientController.createClient);

router.delete("/:id", verifyAuthToken, ClientController.removeClient);

router.put("/", verifyAuthToken, ClientValidator.updateClientValidation, ClientController.updateClients);

export default router;
