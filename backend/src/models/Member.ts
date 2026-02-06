import { model, Schema } from "mongoose";

import type { Document } from "mongoose";

export type Member = {
  name: string;
  location: string;
  role: string;
  linkedin: string;
  email: string;
  headshot: string;
} & Document;

const MemberSchema = new Schema<Member>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  role: { type: String, required: true },
  linkedin: { type: String, required: true },
  email: { type: String, required: true },
  headshot: { type: String, required: true },
});

export default model<Member>("Member", MemberSchema);
