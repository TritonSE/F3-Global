export type Newsletter = {
  _id: string;
  title: string;
  uploadDate: string;
  views: number;
  blurb: string;
  authorName: string;
  pdfUrl: string;
  featured: boolean;
};

export type SortBy = "newest" | "oldest" | "mostViewed" | "leastViewed";

export type PaginatedNewsletters = {
  data: Newsletter[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export type GetAllParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: SortBy;
};

export async function getFeaturedNewsletter(): Promise<Newsletter | null> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/newsletters/featured`);
  if (!res.ok) {
    throw new Error("Failed to fetch featured newsletter");
  }
  return (await res.json()) as Newsletter | null;
}

export async function getAllNewsletters(params: GetAllParams = {}): Promise<PaginatedNewsletters> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const query = new URLSearchParams();
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.sortBy) query.set("sortBy", params.sortBy);

  const qs = query.toString();
  const url = `${backendUrl}/api/newsletters/all${qs ? `?${qs}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch newsletters");
  }
  return (await res.json()) as PaginatedNewsletters;
}
