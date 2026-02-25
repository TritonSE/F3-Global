import { model, Schema } from "mongoose";

import type { Document } from "mongoose";

export type MetricItem = {
  statistic: string;
  subtitle: string;
  description: string;
  order: number;
};

export type ImpactMetricModel = {
  metrics: MetricItem[];
} & Document;

const MetricItemSchema = new Schema<MetricItem>({
  statistic: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true, enum: [0, 1, 2] },
});

const ImpactMetricSchema = new Schema<ImpactMetricModel>({
  metrics: { type: [MetricItemSchema], default: [] },
});

export default model<ImpactMetricModel>("ImpactMetric", ImpactMetricSchema);
