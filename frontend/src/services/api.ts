import axios, { AxiosInstance, AxiosError } from "axios";
import { refreshAuthToken } from "./authService";

//  "https://ratsch-production-okot.vercel.app/api";

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - On 401 try to refresh token and retry; only end session on logout
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAuthToken();
      if (newToken) {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return api.request(originalRequest);
      }
      // No refresh token or refresh failed - clear and redirect to login
      const hadToken = !!localStorage.getItem("authToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        const query = hadToken ? "?expired=1" : "";
        window.location.href = `/login${query}`;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
