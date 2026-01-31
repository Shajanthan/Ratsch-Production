import api from "./api";

export interface Service {
  id?: string;
  mainImageUrl: string;
  mainImagePublicId?: string;
  title: string;
  tagLine: string;
  aboutDescription: string;
  deliverables: string;
  tagColor?: string;
  textColor?: string;
  tags: string[];
  serviceImageUrls: string[];
  serviceImagePublicIds?: string[];
  brandImageUrls: string[];
  brandImagePublicIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

/** Preset tag colors for service cards (used in admin selector and section fallback). */
export const TAG_COLOR_PRESETS = [
  { tagColor: "#FF7C7C", textColor: "#8B0000" },
  { tagColor: "#FFCD7C", textColor: "#8B6600" },
  { tagColor: "#7CC4FF", textColor: "#003C8B" },
  { tagColor: "#9B7CFF", textColor: "#3B008B" },
  { tagColor: "#7CFF9B", textColor: "#008B3B" },
  { tagColor: "#FF7CC4", textColor: "#8B003B" },
] as const;

const BASE = "/services";
const MAX_SERVICE_IMAGES = 10;
const MAX_BRAND_IMAGES = 5;

export { MAX_SERVICE_IMAGES, MAX_BRAND_IMAGES };

/**
 * Build URL slug from service title (e.g. "Video Production" -> "video-production").
 */
export function slugFromTitle(title: string): string {
  const t = (title || "").trim();
  return t
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function getServices(): Promise<Service[]> {
  const { data } = await api.get<{ success: true; data: Service[] }>(BASE);
  return data.data;
}

export async function getServiceById(id: string): Promise<Service> {
  const { data } = await api.get<{ success: true; data: Service }>(
    `${BASE}/${id}`,
  );
  return data.data;
}

export async function addService(
  payload: Omit<Service, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const { data } = await api.post<{ success: true; data: { id: string } }>(
    BASE,
    payload,
  );
  return data.data.id;
}

export async function updateService(
  id: string,
  payload: Omit<Service, "id" | "createdAt" | "updatedAt">,
): Promise<void> {
  await api.put(`${BASE}/${id}`, payload);
}

export async function deleteService(id: string): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}
