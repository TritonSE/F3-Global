import { get, put } from "./requests";

export type College = {
  _id?: string;
  name: string;
  imageUrl: string;
  order: number;
};

export async function getAllColleges(): Promise<College[]> {
  const res = await get("/colleges/all");
  return (await res.json()) as College[];
}

export async function updateColleges(colleges: College[]): Promise<College[]> {
  const res = await put("/colleges/", colleges);
  return (await res.json()) as College[];
}
