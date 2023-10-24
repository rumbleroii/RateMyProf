import { createContext, useContext } from "react";
import useAuthState from "../utils/useAuthState";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ auth, children }) {
  const { user, loading, error, setUser } = useAuthState(auth);

  const value = {
    user,
    loading,
    error,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
