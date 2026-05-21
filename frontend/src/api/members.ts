import { getAuthHeaders } from "./auth";

export type Member = {
  _id: string;
  name: string;
  country: string;
  email: string;
  memberPosition: string;
  linkedinUrl: string;
  headshotUrl: string;
  newImage?: File;
};

export type MemberPayload = {
  name: string;
  country: string;
  email: string;
  memberPosition: string;
  linkedinUrl: string;
  headshotUrl: string;
};

export async function getMembers(): Promise<Member[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/members/all`);
  if (!res.ok) {
    throw new Error("Failed to fetch members");
  }
  return (await res.json()) as Member[];
}

export async function createMember(data: MemberPayload): Promise<Member> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const authHeaders = await getAuthHeaders();
  const res = await fetch(`${backendUrl}/api/members`, {
    method: "POST",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create member");
  return (await res.json()) as Member;
}

export async function updateMember(id: string, data: MemberPayload): Promise<Member> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const authHeaders = await getAuthHeaders();
  const res = await fetch(`${backendUrl}/api/members/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update member");
  return (await res.json()) as Member;
}

export async function deleteMember(id: string): Promise<void> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const authHeaders = await getAuthHeaders();
  const res = await fetch(`${backendUrl}/api/members/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  if (!res.ok) throw new Error("Failed to delete member");
}
