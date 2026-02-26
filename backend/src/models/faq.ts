import { model, Schema } from "mongoose";

export const FAQ_PAGES = ["members", "clients", "donors"] as const;
export type FAQPage = (typeof FAQ_PAGES)[number];

export type FAQ = {
  page: FAQPage;
  question: string;
  answer: string;
  order: string; // kept as string per your request
};

const faqSchema = new Schema<FAQ>(
  {
    page: { type: String, enum: FAQ_PAGES, required: true, trim: true },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    order: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

// Third arg forces Mongo collection name to "faqs"
export const FAQModel = model<FAQ>("FAQ", faqSchema, "faqs");
