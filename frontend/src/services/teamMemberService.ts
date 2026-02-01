import api from "./api";
import { getCached, invalidateCache } from "./cache";

export interface TeamMember {
  id?: string;
  imageUrl: string;
  fullName: string;
  position: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}

const BASE = "/team-members";

export async function getTeamMembers(): Promise<TeamMember[]> {
  return getCached("team-members", async () => {
    const { data } = await api.get<{ success: true; data: TeamMember[] }>(
      BASE,
    );
    return data.data || [];
  });
}

export async function addTeamMember(payload: {
  imageUrl: string;
  fullName: string;
  position: string;
}): Promise<string> {
  const { data } = await api.post<{ success: true; data: { id: string } }>(
    BASE,
    payload,
  );
  invalidateCache("team-members");
  return data.data.id;
}

export async function updateTeamMember(
  id: string,
  payload: { imageUrl?: string; fullName?: string; position?: string },
): Promise<void> {
  await api.put(`${BASE}/${id}`, payload);
  invalidateCache("team-members");
}

export async function deleteTeamMember(id: string): Promise<void> {
  await api.delete(`${BASE}/${id}`);
  invalidateCache("team-members");
}
