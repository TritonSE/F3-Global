import { Router } from "express";

import * as ClientController from "../controllers/client";
import * as ClientValidator from "../validators/client";

const router = Router();

router.get("/all", ClientController.getAllClients);

router.post("/", ClientValidator.createClientValidation, ClientController.createClient);

router.delete("/:id", ClientController.removeClient);

router.put("/", ClientController.updateClients, ClientValidator.updateClientValidation);

export default router;
