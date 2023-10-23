import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import useAuthState from "../utils/useAuthState";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = getAuth();
  const history = useHistory(); 
  const { user, loading, error, setUser } = useAuthState(auth, history);

  const value = {
    user,
    loading,
    error,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
