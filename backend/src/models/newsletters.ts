import { model, Schema } from "mongoose";

const newsletterSchema = new Schema(
  {
    title: { type: String, required: true },
    uploadDate: { type: Date, required: true },
    views: { type: Number, required: true },
    blurb: { type: String, required: true },
    authorName: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  { collection: "newsletters" },
);

newsletterSchema.index(
  { featured: 1 },
  { unique: true, partialFilterExpression: { featured: true } },
);

export default model("Newsletter", newsletterSchema);
