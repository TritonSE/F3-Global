export type College = {
  name: string;
  imageUrl: string;
};

export async function getAllColleges(): Promise<College[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/colleges/all`);
  if (!res.ok) {
    throw new Error("Failed to fetch colleges");
  }
  return res.json();
}

export async function updateColleges(colleges: College[]): Promise<College[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/colleges/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ colleges }),
  });
  if (!res.ok) {
    throw new Error("Failed to update colleges");
  }

  const data = (await res.json()) as College[];
  return data;
}
