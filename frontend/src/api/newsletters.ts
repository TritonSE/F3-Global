import { del, get, patch, post, put } from "./requests";

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

export type NewsletterPayload = Omit<Newsletter, "_id">;

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
  const query = new URLSearchParams();
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.sortBy) query.set("sortBy", params.sortBy);
  if (params.featured) query.set("featured", "true");

  const qs = query.toString();
  const res = await get(`/api/newsletters${qs ? `?${qs}` : ""}`);
  return (await res.json()) as PaginatedNewsletters;
}

export async function getNewsletterById(id: string): Promise<Newsletter | null> {
  try {
    const res = await get(`/api/newsletters/${encodeURIComponent(id)}`);
    return (await res.json()) as Newsletter;
  } catch (error: any) {
    if (error instanceof Error && error.message.startsWith("404")) {
      return null;
    }
    throw error;
  }
}

export async function incrementNewsletterViews(id: string): Promise<Newsletter> {
  const res = await patch(`/api/newsletters/${encodeURIComponent(id)}/views`, undefined);
  return (await res.json()) as Newsletter;
}

export async function createNewsletter(payload: NewsletterPayload): Promise<Newsletter> {
  const res = await post("/api/newsletters/", payload);
  return (await res.json()) as Newsletter;
}

export async function updateNewsletter(
  id: string,
  payload: Partial<NewsletterPayload>,
): Promise<Newsletter> {
  const res = await put(`/api/newsletters/${encodeURIComponent(id)}`, payload);
  return (await res.json()) as Newsletter;
}

export async function deleteNewsletter(id: string): Promise<void> {
  await del(`/api/newsletters/${encodeURIComponent(id)}`);
}
