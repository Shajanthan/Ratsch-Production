import api from "./api";
import { AxiosError } from "axios";

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface VerifyTokenResponse {
  success: boolean;
  user: User;
}

export interface ApiError {
  success: false;
  message: string;
}

// Type guard for AxiosError
const isAxiosError = (error: unknown): error is AxiosError<ApiError> => {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as AxiosError).response !== "undefined"
  );
};

/**
 * Login service
 * @param credentials - Email and password
 * @returns Login response with user data and token
 */
export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  } catch (error: unknown) {
    const apiError: ApiError = isAxiosError(error)
      ? error.response?.data || {
          success: false,
          message: "Login failed. Please try again.",
        }
      : {
          success: false,
          message: "Login failed. Please try again.",
        };
    throw new Error(apiError.message);
  }
};

/**
 * Verify token service
 * @param token - Firebase ID token
 * @returns User data if token is valid
 */
export const verifyToken = async (
  token: string,
): Promise<VerifyTokenResponse> => {
  try {
    const response = await api.post<VerifyTokenResponse>("/auth/verify", {
      idToken: token,
    });
    return response.data;
  } catch (error: unknown) {
    const apiError: ApiError = isAxiosError(error)
      ? error.response?.data || {
          success: false,
          message: "Token verification failed.",
        }
      : {
          success: false,
          message: "Token verification failed.",
        };
    throw new Error(apiError.message);
  }
};

/**
 * Get user by UID
 * @param uid - User UID
 * @returns User data
 */
export const getUser = async (uid: string): Promise<User> => {
  try {
    const response = await api.get<{ success: boolean; user: User }>(
      `/auth/user/${uid}`,
    );
    return response.data.user;
  } catch (error: unknown) {
    const apiError: ApiError = isAxiosError(error)
      ? error.response?.data || {
          success: false,
          message: "Failed to get user data.",
        }
      : {
          success: false,
          message: "Failed to get user data.",
        };
    throw new Error(apiError.message);
  }
};

/**
 * Logout service - Clear local storage (session ends only on explicit logout)
 */
export const logout = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

/**
 * Refresh the auth token using refresh token. Used to keep session alive on 401.
 * @returns New token or null if refresh failed
 */
export const refreshAuthToken = async (): Promise<string | null> => {
  const refreshTokenStored = localStorage.getItem("refreshToken");
  if (!refreshTokenStored) return null;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refreshTokenStored }),
    });
    const data = await response.json();
    if (!response.ok || !data.token) return null;
    localStorage.setItem("authToken", data.token);
    if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
    return data.token;
  } catch {
    return null;
  }
};

/**
 * Get current user from localStorage
 * @returns User object or null
 */
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Get auth token from localStorage
 * @returns Token string or null
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

/**
 * Check if user is authenticated
 * @returns Boolean indicating if user is logged in
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
