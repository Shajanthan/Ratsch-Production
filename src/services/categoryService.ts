import api from "./api";

export interface Category {
  id: string;
  name: string;
  description: string;
}

const BASE = "/categories";

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<{ success: true; data: Category[] }>(BASE);
  return data.data;
}

export async function updateCategory(
  id: string,
  payload: { description?: string; name?: string },
): Promise<void> {
  await api.put(`${BASE}/${id}`, payload);
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}
