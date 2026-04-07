import { model, Schema } from "mongoose";

import type { Document } from "mongoose";

export type AffiliateModel = {
    name: string;
    imageUrl: string;
    order: number;
} & Document;

const AffiliateSchema = new Schema<AffiliateModel>({
    name:  {type: String, required: true},
    imageUrl: {type: String, required: true},
    order: {type: Number, required: true, default: 0}
})

export default model<AffiliateModel>("Affiliate", AffiliateSchema);