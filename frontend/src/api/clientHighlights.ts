export type HighlightItem = {
  _id?: string;
  quoteText: string;
  previewText: string;
  imageUrl: string;
  fullText: string;
  order: number;
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
