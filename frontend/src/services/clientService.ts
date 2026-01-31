import api from "./api";
import { getCached } from "./cache";

export interface Client {
  id?: string;
  imageUrl: string;
  imagePublicId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const BASE = "/clients";

export async function getClients(): Promise<Client[]> {
  return getCached("clients", async () => {
    const { data } = await api.get<{ success: true; data: Client[] }>(BASE);
    return data.data;
  });
}

export async function addClient(payload: {
  imageUrl: string;
  imagePublicId?: string;
}): Promise<string> {
  const { data } = await api.post<{ success: true; data: { id: string } }>(
    BASE,
    payload,
  );
  return data.data.id;
}

export async function deleteClient(id: string): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}
