import api from "./api";
import { getCached, invalidateCache } from "./cache";

export interface CoreValue {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  imagePublicId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const BASE = "/core-values";

export async function getCoreValues(): Promise<CoreValue[]> {
  return getCached("core-values", async () => {
    const { data } = await api.get<{ success: true; data: CoreValue[] }>(BASE);
    return data.data;
  });
}

export async function addCoreValue(payload: {
  title: string;
  description: string;
  imageUrl: string;
  imagePublicId?: string;
}): Promise<string> {
  const { data } = await api.post<{ success: true; data: { id: string } }>(
    BASE,
    payload,
  );
  invalidateCache("core-values");
  return data.data.id;
}

export async function updateCoreValue(
  id: string,
  payload: {
    title: string;
    description: string;
    imageUrl: string;
    imagePublicId?: string;
  },
): Promise<void> {
  await api.put(`${BASE}/${id}`, payload);
  invalidateCache("core-values");
}

export async function deleteCoreValue(id: string): Promise<void> {
  await api.delete(`${BASE}/${id}`);
  invalidateCache("core-values");
}
