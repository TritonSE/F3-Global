export type Timeline = {
  _id: string;
  year: number;
  description: string;
  imageUrl: string;
};

export async function getAllTimeline(): Promise<Timeline[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("Backend URL is not defined");
  }
  const res = await fetch(`${backendUrl}/api/timeline/all`);
  if (!res.ok) {
    throw new Error("Failed to fetch timeline data");
  }
  const data = (await res.json()) as Timeline[];
  return data;
}
