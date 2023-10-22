import { useEffect, useState } from "react";
import { useApi } from "./api";

export default function useAuthState(auth) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const setAuth = (user) => {
    setUser(user);
    setLoading(false);
  };
  useEffect(() => {
    const listener = auth.onAuthStateChanged(async (user) => {
      console.log(await auth.currentUser.getIdToken());
      setAuth(auth);
    }, setError);

    return () => {
      listener();
    };
  }, [auth]);
  return { user, loading, error, setAuth, profile, setProfile };
}
