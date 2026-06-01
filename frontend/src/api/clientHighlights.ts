import { get, put } from "./requests";

export type HighlightItem = {
  _id?: string;
  clientName: string;
  quoteText: string;
  previewText: string;
  imageUrl: string;
  fullText: string;
  order: number;
  newImage?: File;
};

export async function getClientHighlights(): Promise<HighlightItem[]> {
  const res = await get("/client-highlights");
  return (await res.json()) as HighlightItem[];
}

export async function updateClientHighlights(
  highlights: HighlightItem[],
): Promise<HighlightItem[]> {
  const res = await put("/client-highlights/", { highlights });
  return (await res.json()) as HighlightItem[];
}
