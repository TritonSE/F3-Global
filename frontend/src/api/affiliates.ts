export type Affiliate = {
  _id?: string;
  name: string;
  imageUrl: string;
  order: number;
};

export async function getAllAffiliates(): Promise<Affiliate[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/affiliates/all`);

  if (!res.ok) {
    throw new Error("Failed to fetch all affiliates");
  }

  return (await res.json()) as Affiliate[];
}
