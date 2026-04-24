import { Router } from "express";

import * as MemberController from "../controllers/member";
import { verifyAuthToken } from "../validators/auth";
import * as Validators from "../validators/member";

const router = Router();

router.get("/all", MemberController.getAllMembers);

router.post("/", verifyAuthToken, Validators.createMember, MemberController.createMember);

router.put("/", verifyAuthToken, Validators.updateMembers, MemberController.updateMembers);

router.delete("/:id", verifyAuthToken, Validators.deleteMember, MemberController.deleteMember);

export default router;
