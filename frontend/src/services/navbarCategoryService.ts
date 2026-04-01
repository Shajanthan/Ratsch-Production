import api from "./api";
import { getCached, invalidateCache } from "./cache";

export interface NavbarCategory {
  id?: string;
  key: string;
  title: string;
  icon?: string;
  order?: number;
  items: string[];
  createdAt?: string | null;
  updatedAt?: string | null;
}

const BASE = "/navbar-categories";

export async function getNavbarCategories(): Promise<NavbarCategory[]> {
  return getCached("navbar-categories", async () => {
    const { data } = await api.get<{ success: true; data: NavbarCategory[] }>(
      BASE,
    );
    return data.data;
  });
}

export async function addNavbarCategory(
  payload: Omit<NavbarCategory, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const { data } = await api.post<{ success: true; data: { id: string } }>(
    BASE,
    payload,
  );
  invalidateCache("navbar-categories");
  return data.data.id;
}

export async function updateNavbarCategory(
  id: string,
  payload: Omit<NavbarCategory, "id" | "createdAt" | "updatedAt">,
): Promise<void> {
  await api.put(`${BASE}/${id}`, payload);
  invalidateCache("navbar-categories");
}

export async function deleteNavbarCategory(id: string): Promise<void> {
  await api.delete(`${BASE}/${id}`);
  invalidateCache("navbar-categories");
}

