"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { User, AuthContextType } from "@/types/global";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, token, isLoading, setAuth, clearAuth, setLoading } = useAuthStore();

  // Initialize loading state from store on mount
  useEffect(() => {
    setLoading(false); 
  }, [setLoading]);

  const signIn = (userData: User, authToken: string, redirectTo?: string) => {
    setAuth(userData, authToken);
    if (redirectTo) {
      window.location.href = redirectTo;
    } else {
      window.location.href = "/";
    }
  };

  const signOut = () => {
    clearAuth();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
