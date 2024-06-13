import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context";
import T from "prop-types";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const { isLogged } = useAuth();
  return isLogged ? children : <Navigate to="/login" state={location} />;
}

RequireAuth.propTypes = {
  children: T.node,
};
