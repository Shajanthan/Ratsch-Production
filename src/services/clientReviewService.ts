import api from "./api";

export interface ClientReview {
  id?: string;
  firstName: string;
  lastName: string;
  position: string;
  companyName: string;
  review: string;
  profilePictureUrl: string;
  /** Cloudinary public_id; used to delete image on review delete or re-upload */
  profilePicturePublicId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const BASE = "/client-reviews";

export async function getClientReviews(): Promise<ClientReview[]> {
  const { data } = await api.get<{ success: true; data: ClientReview[] }>(BASE);
  return data.data;
}

export async function addClientReview(
  payload: Omit<ClientReview, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const { data } = await api.post<{ success: true; data: { id: string } }>(
    BASE,
    payload,
  );
  return data.data.id;
}

export async function updateClientReview(
  id: string,
  payload: Omit<ClientReview, "id" | "createdAt" | "updatedAt">,
): Promise<void> {
  await api.put(`${BASE}/${id}`, payload);
}

export async function deleteClientReview(id: string): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}
