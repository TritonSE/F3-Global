import { getAuthHeaders } from "./auth";

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

type HighlightItemModel = {
  highlights: HighlightItem[];
};

export async function getClientHighlights(): Promise<HighlightItem[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const result = await fetch(`${backendUrl}/api/client-highlights`);

  if (!result.ok) {
    throw new Error("Failed to fetch client highlights");
  }

  const data = (await result.json()) as HighlightItemModel;

  return data.highlights;
}

export async function updateClientHighlights(
  highlights: HighlightItem[],
): Promise<HighlightItem[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const authHeaders = await getAuthHeaders();
  const res = await fetch(`${backendUrl}/api/client-highlights`, {
    method: "PUT",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({ highlights }),
  });
  if (!res.ok) throw new Error("Failed to update client highlights");
  const data = (await res.json()) as HighlightItemModel;
  return data.highlights;
}
