export type FaqPage = "donors" | "members" | "clients";

export type FaqItem = {
  _id?: string;
  question: string;
  answer: string;
  order: number;
};

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
  const { auth } = await import("@/firebase/firebase");

  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error("Not authenticated");

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("Backend URL is not defined");
  }

  const res = await fetch(`${backendUrl}/api/faq?page=${page}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(faqs),
  });

  if (!res.ok) {
    throw new Error("Failed to update FAQs");
  }
}
