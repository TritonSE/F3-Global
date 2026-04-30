import { getAuthHeaders } from "./auth";

export type TimelineItem = {
  _id: string;
  year: number;
  description: string;
  imageUrl: string;
  newImage?: File;
};

export async function getTimelines(): Promise<TimelineItem[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/timeline/all`);
  if (!res.ok) {
    throw new Error("Failed to fetch timelines");
  }
  const data = (await res.json()) as TimelineItem[];
  return data;
}

export async function updateTimeline(items: TimelineItem[]): Promise<TimelineItem[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const authHeaders = await getAuthHeaders();
  const res = await fetch(`${backendUrl}/api/timeline`, {
    method: "PUT",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(items),
  });
  if (!res.ok) throw new Error("Failed to update timeline");
  return (await res.json()) as TimelineItem[];
}
