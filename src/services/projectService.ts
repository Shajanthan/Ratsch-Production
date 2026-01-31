import api from "./api";

export interface Project {
  id?: string;
  titleLine1: string;
  titleLine2: string;
  /** Category document id (stored in DB). Resolved to name in projectCategory when reading. */
  projectCategoryId?: string;
  /** Resolved category name (from category id). For display and for legacy / when sending new name. */
  projectCategory?: string;
  smallDescription: string;
  date: string;
  type: string;
  client: string;
  overview: string;
  results: string;
  coverImageUrl?: string;
  coverImagePublicId?: string;
  imageUrls: string[];
  imagePublicIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

/** Payload: send projectCategoryId when selecting existing category, or projectCategory (name) when typing new. */
export type ProjectPayload = Omit<Project, "id" | "createdAt" | "updatedAt">;

const BASE = "/projects";
const MAX_IMAGES = 10;

export { MAX_IMAGES };

/**
 * Build URL slug from title line 1 and 2 (e.g. "Wedding" + "Pre-Shoot" -> "wedding-pre-shoot").
 * Used for project detail path.
 */
export function slugFromTitleLines(line1: string, line2: string): string {
  const combined = `${(line1 || "").trim()} ${(line2 || "").trim()}`.trim();
  return combined
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function getProjects(): Promise<Project[]> {
  const { data } = await api.get<{ success: true; data: Project[] }>(BASE);
  return data.data;
}

export async function getProjectById(id: string): Promise<Project> {
  const { data } = await api.get<{ success: true; data: Project }>(
    `${BASE}/${id}`,
  );
  return data.data;
}

export async function addProject(payload: ProjectPayload): Promise<string> {
  const { data } = await api.post<{ success: true; data: { id: string } }>(
    BASE,
    payload,
  );
  return data.data.id;
}

export async function updateProject(
  id: string,
  payload: ProjectPayload,
): Promise<void> {
  await api.put(`${BASE}/${id}`, payload);
}

export async function deleteProject(id: string): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}
