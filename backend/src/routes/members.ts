import { Router } from "express";

import * as MemberController from "../controllers/members";
//import { verifyAuthToken } from "../validators/auth";
import * as Validators from "../validators/members";

const router = Router();

router.get("/", MemberController.getAllMembers);

router.post("/", Validators.createMember, MemberController.createMember);

router.put("/:id", Validators.updateMember, MemberController.updateMember);

router.delete("/:id", Validators.deleteMember, MemberController.deleteMember);

export default router;
