import api from "./api";
import { getCached, invalidateCache } from "./cache";

export interface RatschHomeSettings {
  bannerImageUrl: string;
  bannerImagePublicId?: string;
}

const BASE = "/ratsch-homepage";

export async function getRatschHomeSettings(): Promise<RatschHomeSettings> {
  return getCached("ratsch-homepage/settings", async () => {
    const { data } = await api.get<{
      success: true;
      data: RatschHomeSettings;
    }>(`${BASE}/settings`);
    return data.data;
  });
}

export async function updateRatschHomeSettings(
  payload: RatschHomeSettings,
): Promise<RatschHomeSettings> {
  const { data } = await api.put<{
    success: true;
    data: RatschHomeSettings;
  }>(`${BASE}/settings`, payload);
  invalidateCache("ratsch-homepage/settings");
  return data.data;
}

