export type FaqPage = "donors" | "members" | "clients";

export type FaqItem = {
  _id?: string;
  question: string;
  answer: string;
  order: number;
};

export type FaqWithLocalId = FaqItem & { localId: string };

export async function getFaq(page: FaqPage): Promise<FaqItem[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("Backend URL is not defined");
  }

  const res = await fetch(`${backendUrl}/api/faq?page=${page}`);

  if (!res.ok) {
    throw new Error("Failed to fetch FAQ data");
  }

  const data = (await res.json()) as FaqItem[];

  return data;
}

export async function putFaqs(page: FaqPage, faqs: FaqItem[]): Promise<void> {
  const { getAuthHeaders } = await import("@/api/auth");
  const authHeaders = await getAuthHeaders();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("Backend URL is not defined");
  }

  const res = await fetch(`${backendUrl}/api/faq?page=${page}`, {
    method: "PUT",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(faqs),
  });

  if (!res.ok) {
    throw new Error("Failed to update FAQs");
  }
}
