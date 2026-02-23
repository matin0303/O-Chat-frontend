"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { checkAuth } from "@/lib/auth";
import { AuthResponse, User } from "@/types/auth.types";
import Cookies from "js-cookie";

interface AuthContextType {
  accessToken:string|null;
  user: User | null;
  isLoading: boolean;
  loadUser: () => void;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(Cookies.get("access_token") || null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    const currentUser = await checkAuth();
    if (currentUser) {
      setUser(currentUser.user);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadUser();
    // const interval = setInterval(loadUser, 60_000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{accessToken ,setAccessToken, user, isLoading,  loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};