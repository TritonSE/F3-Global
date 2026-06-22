import { get, put } from "./requests";

export type City = string;

export async function getAllCities(): Promise<City[]> {
  const res = await get("/cities/all");
  return (await res.json()) as City[];
}

export async function updateCities(cities: string[]): Promise<City[]> {
  const res = await put("/cities/", { cities });
  return (await res.json()) as City[];
}
