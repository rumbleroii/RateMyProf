import useSWR from "swr/immutable";
import { useAuth } from "../context/AuthContext";

const fetcher = (user) => async (url, options) => {
  const token = await user.currentUser.getIdToken();
  options = {
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

function useApi(path, options) {
  const { user, loading } = useAuth();
  const {
    data,
    error,
    loading: dataLoading,
  } = useSWR(
    !loading ? `${process.env.REACT_APP_API_ID}${path}` : undefined,
    fetcher(user)
  );
  return { data, error, loading: loading || dataLoading };
}

export { useApi };
