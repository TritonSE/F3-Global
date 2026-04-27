export type Newsletter = {
  _id: string;
  title: string;
  uploadDate: Date;
  views: number;
  blurb: string;
  authorName: string;
  pdfUrl: string;
};

export type NewslettersResponse = {
  data: Newsletter[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export async function getNewsletters(page = 1): Promise<NewslettersResponse> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/newsletters/all?page=${page}&limit=100`);
  if (!res.ok) throw new Error("Failed to fetch newsletters");
  const data = (await res.json()) as NewslettersResponse;
  return data;
}

export async function incrementNewsletterViews(id: string): Promise<void> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/newsletters/${id}/views`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Failed to increment views");
}
