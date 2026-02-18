import { Router } from "express";

import * as MemberController from "../controllers/member";
import * as Validators from "../validators/member";

const router = Router();

router.get("/all", MemberController.getAllMembers);

router.post("/", Validators.createMember, MemberController.createMember);

router.put("/", Validators.updateMembers, MemberController.updateMembers);

router.delete("/:id", Validators.deleteMember, MemberController.deleteMember);

export default router;
