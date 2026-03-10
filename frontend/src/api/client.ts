export type Client = {
  _id: string;
  name: string;
  imageUrl: string;
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
