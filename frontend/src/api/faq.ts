import { get, put } from "./requests";

export type FaqPage = "donors" | "members" | "clients";

export type FaqItem = {
  _id?: string;
  question: string;
  answer: string;
  order: number;
};

export type FaqWithLocalId = FaqItem & { localId: string };

export async function getFaq(page: FaqPage): Promise<FaqItem[]> {
  const res = await get(`/api/faq?page=${page}`);
  return (await res.json()) as FaqItem[];
}

export async function putFaqs(page: FaqPage, faqs: FaqItem[]): Promise<void> {
  await put(`/api/faq?page=${page}`, faqs);
}
