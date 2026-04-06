import axios, { isAxiosError } from "axios";
import { getApiBaseUrl } from "@/config/apiBaseUrl";

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

/**
 * Public contact form — no auth. Uses a standalone axios call so 401 handling
 * from the main API client does not apply.
 */
export async function sendContactForm(
  payload: ContactFormPayload,
): Promise<void> {
  try {
    const res = await axios.post<{ success: boolean; message?: string }>(
      `${getApiBaseUrl()}/contact`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
      },
    );
    if (!res.data?.success) {
      throw new Error(res.data?.message || "Failed to send message.");
    }
  } catch (e: unknown) {
    if (isAxiosError(e) && e.response?.data && typeof e.response.data === "object") {
      const msg = (e.response.data as { message?: string }).message;
      if (msg) throw new Error(msg);
    }
    if (e instanceof Error) throw e;
    throw new Error("Failed to send message.");
  }
}
