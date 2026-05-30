import { del, get, post, put } from "./requests";

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
  const res = await get("/api/members/all");
  return (await res.json()) as Member[];
}

export async function createMember(data: MemberPayload): Promise<Member> {
  const res = await post("/api/members", data);
  return (await res.json()) as Member;
}

export async function updateMember(id: string, data: MemberPayload): Promise<Member> {
  const res = await put(`/api/members/${encodeURIComponent(id)}`, data);
  return (await res.json()) as Member;
}

export async function deleteMember(id: string): Promise<void> {
  await del(`/api/members/${encodeURIComponent(id)}`);
}
