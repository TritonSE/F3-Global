import { model, Schema } from "mongoose";

const newsletterSchema = new Schema(
  {
    title: { type: String, required: true },
    uploadDate: { type: Date, required: true },
    views: { type: Number, required: true },
    blurb: { type: String, required: true },
    authorName: { type: String, required: true },
    pdfUrl: { type: String, required: true },
  },
  { collection: "newsletters" },
);

export default model("Newsletter", newsletterSchema);
