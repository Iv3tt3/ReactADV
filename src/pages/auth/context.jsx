import { createContext, useContext, useState } from "react";
import T from "prop-types";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ isDefaultLogged, children }) => {
  const [isLogged, setIsLogged] = useState(isDefaultLogged);

  const handleIsLogged = () => setIsLogged(true);

  const handleIsLogout = () => setIsLogged(false);

  const authValue = {
    isLogged,
    onLogin: handleIsLogged,
    onLogout: handleIsLogout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  isDefaultLogged: PropTypes.bool,
  children: T.node,
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
