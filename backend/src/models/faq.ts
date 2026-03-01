import { model, Schema } from "mongoose";

import type { Document } from "mongoose";

export type FAQModel = {
  page: "members" | "clients" | "donors";
  question: string;
  answer: string;
  order: number;
} & Document;

const faqSchema = new Schema<FAQModel>({
  page: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, required: true },
});

export default model<FAQModel>("FAQ", faqSchema, "faqs");
