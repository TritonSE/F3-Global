import { getAuthHeaders } from "./auth";

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

export async function updateAffiliates(affiliates: Affiliate[]): Promise<Affiliate[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const authHeaders = await getAuthHeaders();
  const res = await fetch(`${backendUrl}/api/affiliates/`, {
    method: "PUT",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(affiliates),
  });
  if (!res.ok) {
    throw new Error("Failed to update colleges");
  }

  const data = (await res.json()) as Affiliate[];
  return data;
}
