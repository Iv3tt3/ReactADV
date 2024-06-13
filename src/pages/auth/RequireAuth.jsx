import { Navigate, useLocation } from "react-router-dom";
import T from "prop-types";
import { getIsLogged } from "../../store/selectors";
import { useSelector } from "react-redux";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const isLogged = useSelector(getIsLogged);
  return isLogged ? children : <Navigate to="/login" state={location} />;
}

RequireAuth.propTypes = {
  children: T.node,
};
