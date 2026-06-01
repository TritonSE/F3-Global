import { get, put } from "./requests";

export type TimelineItem = {
  _id: string;
  year: number;
  description: string;
  imageUrl: string;
  newImage?: File;
};

export async function getTimelines(): Promise<TimelineItem[]> {
  const res = await get("/timeline/all");
  return (await res.json()) as TimelineItem[];
}

export async function updateTimeline(items: TimelineItem[]): Promise<TimelineItem[]> {
  const res = await put("/timeline", items);
  return (await res.json()) as TimelineItem[];
}
