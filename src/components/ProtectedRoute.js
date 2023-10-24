import { useAuth } from "../context/AuthContext";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth();
  console.log({ user, loading });
  return (
    <Route
      {...rest}
      render={(props) =>
        user || loading ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
export default ProtectedRoute;
