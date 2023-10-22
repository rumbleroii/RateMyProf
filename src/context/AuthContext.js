import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import useAuthState from "../utils/useAuthState";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { user, loading, error, setUser } = useAuthState(getAuth());
  const value = {
    user,
    loading,
    error,
    setUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
