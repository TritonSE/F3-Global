import { getAuthHeaders } from "@/api/auth";

export type Client = {
  _id?: string;
  name: string;
  imageUrl: string;
  order: number;
};

export async function getAllClients(): Promise<Client[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/clients/all`);

  if (!res.ok) {
    throw new Error("Failed to fetch all clients");
  }

  const data = (await res.json()) as Client[];

  return data;
}

export async function updateClients(clients: Client[]): Promise<Client[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const authHeaders = await getAuthHeaders();
  const res = await fetch(`${backendUrl}/api/clients/`, {
    method: "PUT",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(clients),
  });

  if (!res.ok) {
    throw new Error("Failed to update clients");
  }

  return (await res.json()) as Client[];
}
