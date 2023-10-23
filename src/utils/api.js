import useSWR from "swr/immutable";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const fetcher = (user) => async (url, options) => {
  const token = await user.currentUser.getIdToken();
  options = {
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();
  return data;
};

function useApi(path, options) {
  const { user, loading } = useAuth();
  const history = useHistory();

  const handleRedirect = (statusCode) => {
    if (statusCode == 403) history.push("/");
    else if (statusCode == 422) history.push("/registerprofile");
  };

  const {
    data,
    error,
    loading: dataLoading,
  } = useSWR(
    !loading ? `${process.env.REACT_APP_API_ID}${path}` : undefined,
    fetcher(user),
    {
      onError: (error) => {
        if (error.message === "403") {
          handleRedirect(403);
        } else if (error.message === "422") {
          handleRedirect(422);
        }
      },
    }
  );

  return { data, error, loading: loading || dataLoading };
}

export { useApi };
