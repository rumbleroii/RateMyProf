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
        console.log(await auth.currentUser.getIdToken());
        setAuth(auth);
      }
      setAuth(undefined);
      console.log({ user });
    }, setError);

    return () => {
      listener();
    };
  }, [auth]);

  return { user, loading, error, setAuth, profile, setProfile };
}
