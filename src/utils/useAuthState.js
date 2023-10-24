import { useEffect, useState } from "react";

export default function useAuthState(auth, history) {
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
      if (user) {
        const idToken = await auth.currentUser.getIdToken();
        console.log({ idToken });
        setAuth(auth);
      } else {
        setAuth(undefined);
      }
    }, setError);

    return () => {
      listener();
    };
  }, [auth]);

  return { user, loading, error, setAuth, profile, setProfile };
}
