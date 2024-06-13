import { Logo } from "../shared/logo";
import Button from "../shared/Button";
import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";
import { Link, NavLink } from "react-router-dom";
import "./Header.module.css";

export default function Header() {
  const { isLogged, onLogout } = useAuth();

  const handleLogout = () => {
    onLogout();
    logout();
  };

  return (
    <header>
      <Link to="/">
        <Logo width={300}></Logo>
      </Link>
      <nav>
        {isLogged ? (
          <>
            <Button onClick={handleLogout}>Logout</Button>
            <>
              <Button as={NavLink} to="/adverts/new">
                New Ad
              </Button>
              <Button as={NavLink} to="/adverts" end>
                All Ads
              </Button>
            </>
          </>
        ) : null}
      </nav>
    </header>
  );
}
