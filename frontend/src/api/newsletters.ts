export type Newsletter = {
  _id: string;
  title: string;
  uploadDate: string;
  views: number;
  blurb: string;
  pdfUrl: string;
  imageUrl?: string;
  featured: boolean;
};

export type SortBy =
  | "none"
  | "newest"
  | "oldest"
  | "mostViewed"
  | "leastViewed"
  | "titleAsc"
  | "titleDesc"
  | "dateAsc"
  | "dateDesc"
  | "viewsAsc"
  | "viewsDesc";

export type PaginatedNewsletters = {
  data: Newsletter[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export type GetNewslettersParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: SortBy;
  featured?: boolean;
};

export async function getNewsletters(
  params: GetNewslettersParams = {},
): Promise<PaginatedNewsletters> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const query = new URLSearchParams();
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.sortBy) query.set("sortBy", params.sortBy);
  if (params.featured) query.set("featured", "true");

  const qs = query.toString();
  const url = `${backendUrl}/api/newsletters${qs ? `?${qs}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch newsletters");
  }
  return (await res.json()) as PaginatedNewsletters;
}

export async function getNewsletterById(id: string): Promise<Newsletter | null> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/newsletters/${encodeURIComponent(id)}`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("Failed to fetch newsletter");
  }
  return (await res.json()) as Newsletter;
}

export async function incrementNewsletterViews(id: string): Promise<Newsletter> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/newsletters/${encodeURIComponent(id)}/views`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to increment views");
  return (await res.json()) as Newsletter;
}
