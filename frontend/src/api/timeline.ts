export type TimelineItem = {
  year: number;
  description: string;
  imageUrl: string;
};

export async function getTimeline(): Promise<TimelineItem[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  //Validate backendUrl
  if (!backendUrl) {
    throw new Error("Backend URL is not defined");
  }

  const res = await fetch(`${backendUrl}/api/timeline/all`);

  if (!res.ok) {
    throw new Error("Failed to fetch timeline data");
  }

  const timelineData = (await res.json()) as TimelineItem[];

  return timelineData;
}
