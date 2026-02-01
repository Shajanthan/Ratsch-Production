import api from "./api";
import { getCached, invalidateCache } from "./cache";

export interface CeoSection {
  imageUrl: string;
  firstName: string;
  lastName: string;
  position: string;
  companyName: string;
  description: string;
}

const BASE = "/about-us";

export async function getCeoSection(): Promise<CeoSection> {
  return getCached("about-us/ceo", async () => {
    const { data } = await api.get<{ success: true; data: CeoSection }>(
      `${BASE}/ceo`,
    );
    return data.data;
  });
}

export async function updateCeoSection(payload: CeoSection): Promise<CeoSection> {
  const { data } = await api.put<{ success: true; data: CeoSection }>(
    `${BASE}/ceo`,
    payload,
  );
  invalidateCache("about-us/ceo");
  return data.data;
}
