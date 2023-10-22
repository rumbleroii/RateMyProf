import { useAuth } from "../context/AuthContext";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth();
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
