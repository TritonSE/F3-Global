export type City = string;

export async function getAllCities(): Promise<City[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/cities/all`);

  if (!res.ok) {
    throw new Error("Failed to fetch all cities");
  }

  const data = (await res.json()) as City[];
  return data;
}

export async function updateCities(cities: string[]): Promise<City[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/cities/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cities }),
  });

  if (!res.ok) {
    throw new Error("Failed to update cities");
  }

  const data = (await res.json()) as City[];
  return data;
}
