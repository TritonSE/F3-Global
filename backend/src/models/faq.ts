import { model, Schema } from "mongoose";

import type { Document } from "mongoose";

export const FAQ_PAGES = ["members", "clients", "donors"] as const;
export type FAQPage = (typeof FAQ_PAGES)[number];

export type FAQDocument = {
  page: FAQPage;
  question: string;
  answer: string;
  order: number;
} & Document;

const faqSchema = new Schema<FAQDocument>(
  {
    page: { type: String, required: true, enum: FAQ_PAGES, trim: true },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0 },
  },
  { collection: "faqs" },
);

faqSchema.index({ page: 1, order: 1 });

export const FAQModel = model<FAQDocument>("FAQ", faqSchema);
