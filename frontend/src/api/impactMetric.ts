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
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/impact-metrics`);

  if (!res.ok) {
    throw new Error("Failed to fetch all impact metrics");
  }

  const data = (await res.json()) as ImpactMetricResponse;

  return data;
}

export async function updateImpactMetric(metrics: ImpactMetric[]): Promise<void> {
  const { auth } = await import("@/firebase/firebase");

  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error("Not authenticated");

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/impact-metrics`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ metrics }),
  });

  if (!res.ok) {
    throw new Error("Failed to update impact metrics");
  }
}
