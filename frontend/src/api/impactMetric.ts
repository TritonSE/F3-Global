export type ImpactMetric = {
  _id: string;
  statistic: string;
  subtitle: string;
  description: string;
  order: 0 | 1 | 2;
};

type ImpactMetricResponse = {
  _id: string;
  metrics: ImpactMetric[];
};

export async function getImpactMetric(): Promise<ImpactMetric[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/impact-metrics`);

  if (!res.ok) {
    throw new Error("Failed to fetch all impact metrics");
  }

  const data = (await res.json()) as ImpactMetricResponse;

  return data.metrics;
}
