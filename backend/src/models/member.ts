import { model, Schema } from "mongoose";

import type { Document } from "mongoose";

export type MemberModel = {
  name: string;
  country: string;
  memberPosition: string;
  linkedinUrl: string;
  headshotUrl: string;
} & Document;

const MemberSchema = new Schema<MemberModel>({
  name: { type: String, required: true },
  country: { type: String, required: true },
  memberPosition: { type: String, required: true },
  linkedinUrl: { type: String, required: true },
  headshotUrl: { type: String, required: true },
});

export default model<MemberModel>("Member", MemberSchema);
