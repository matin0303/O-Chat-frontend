import api from "./api";
import { setTokens } from "./api";
import { LoginCredentials, RegisterCredentials, AuthResponse } from "@/types/auth.types";

export const register = async (credentials: RegisterCredentials): Promise<void> => {
  await api.post("/auth/register", credentials);
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", credentials);
  setTokens(data.accessToken, data.refreshToken);
  return data;
};

export const logout = () => {
  setTokens(null, null);
  window.location.href = "/login";
};

export const checkAuth = async (): Promise<AuthResponse | null> => {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (err) {
    return null;
  }
};