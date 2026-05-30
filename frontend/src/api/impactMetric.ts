import { get, put } from "./requests";

export type ImpactMetric = {
  _id: string;
  statistic: string;
  subtitle: string;
  description: string;
  order: 0 | 1 | 2;
};

export type ImpactMetricResponse = {
  _id: string;
  metrics: ImpactMetric[];
  lastUpdated: string;
};

export async function getImpactMetric(): Promise<ImpactMetricResponse> {
  const res = await get("/api/impact-metrics");
  return (await res.json()) as ImpactMetricResponse;
}

export async function updateImpactMetric(metrics: ImpactMetric[]): Promise<void> {
  await put("/api/impact-metrics/", { metrics });
}
