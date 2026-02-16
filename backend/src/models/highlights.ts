import { model, Schema } from "mongoose";

import type { Document, Types } from "mongoose";

type HighlightItem = {
  _id?: string | Types.ObjectId;
  quoteText: string;
  previewText: string;
  imageUrl: string;
  fullText: string;
  order: number;
};

export type HighlightItemModel = {
  highlights: HighlightItem[];
} & Document;

const HighlightItemSchema = new Schema<HighlightItem>(
  {
    quoteText: { type: String, required: true },
    previewText: { type: String, required: true },
    imageUrl: { type: String, required: true },
    fullText: { type: String, required: true },
    order: { type: Number, required: true, enum: [0, 1, 2] },
  },
  { _id: true }, //true since we need to select one of them for the other webpage
);

export const HighlightsSchema = new Schema<HighlightItemModel>(
  {
    highlights: {
      type: [HighlightItemSchema],
      required: true,
      validate: {
        validator: (v: HighlightItem[]) => {
          if (v.length !== 3) return false;

          const orders = v.map((x) => x.order);
          return [0, 1, 2].every((o) => orders.includes(o));
        },
        message: "Can only have 3 highlights or has a Duplicated order",
      },
    },
  },
  { collection: "client-highlights" },
);

export default model<HighlightItemModel>("client-highlights", HighlightsSchema);
