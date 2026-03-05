export type FaqItem = {
  question: string;
  answer: string;
};

export async function getFaq(page: string): Promise<FaqItem[]> {
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
