import api from "./api";
import { getCached } from "./cache";

export interface HomepageSettings {
  projectId1: string;
  projectId2: string;
  projectId3: string;
  latestProjectId1: string;
  latestProjectId2: string;
  latestProjectId3: string;
  latestProjectId4: string;
  clientId1: string;
  clientId2: string;
  clientId3: string;
  clientId4: string;
  coreValueId1: string;
  coreValueId2: string;
  coreValueId3: string;
}

const BASE = "/homepage";

export async function getHomepageSettings(): Promise<HomepageSettings> {
  return getCached("homepage/settings", async () => {
    const { data } = await api.get<{ success: true; data: HomepageSettings }>(
      `${BASE}/settings`,
    );
    return data.data;
  });
}

export async function updateHomepageSettings(
  payload: HomepageSettings,
): Promise<void> {
  await api.put(`${BASE}/settings`, payload);
}
