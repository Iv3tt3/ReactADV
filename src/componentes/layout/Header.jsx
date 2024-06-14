import { Logo } from "../shared/logo";
import Button from "../shared/Button";
import { logout } from "../../pages/auth/service";
import { Link, NavLink } from "react-router-dom";
import "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../store/actions";
import { getIsLogged } from "../../store/selectors";

export default function Header() {
  const isLogged = useSelector(getIsLogged)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(authLogout());
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
