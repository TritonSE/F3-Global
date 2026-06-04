import { get, put } from "./requests";

export type Client = {
  _id?: string;
  name: string;
  imageUrl: string;
  order: number;
};

export async function getAllClients(): Promise<Client[]> {
  const res = await get("/clients/all");
  return (await res.json()) as Client[];
}

export async function updateClients(clients: Client[]): Promise<Client[]> {
  const res = await put("/clients/", clients);
  return (await res.json()) as Client[];
}
