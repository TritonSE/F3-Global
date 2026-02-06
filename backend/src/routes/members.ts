import { Router } from "express";

import Member from "../models/Member";
import { verifyAuthToken } from "../validators/auth";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", verifyAuthToken, async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
