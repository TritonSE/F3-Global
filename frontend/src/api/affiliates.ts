import { get, put } from "./requests";

export type Affiliate = {
  _id?: string;
  name: string;
  imageUrl: string;
  order: number;
};

export async function getAllAffiliates(): Promise<Affiliate[]> {
  const res = await get("/affiliates/all");
  return (await res.json()) as Affiliate[];
}

export async function updateAffiliates(affiliates: Affiliate[]): Promise<Affiliate[]> {
  const res = await put("/affiliates/", affiliates);
  return (await res.json()) as Affiliate[];
}
