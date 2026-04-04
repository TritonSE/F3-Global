import { model, Schema } from "mongoose";

import type { Document } from "mongoose";

export type timelineModel = {
  year: number;
  text: string;
  imageUrl: string;
} & Document;

const timelineSchema = new Schema<timelineModel>({
  year: { type: Number, required: true, unique: true },
  text: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export default model<timelineModel>("Timeline", timelineSchema, "timeline");
