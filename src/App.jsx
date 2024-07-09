import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AdvertsList } from "./pages/adverts/AdvertsList.jsx";
import  LoginPage  from "./pages/auth/Login.jsx";
import { AdvertDetail } from "./pages/adverts/AdvertDetail";
import { NewAdvert } from "./pages/adverts/NewAdvert.jsx";
import RequireAuth from "./pages/auth/RequireAuth.jsx";
import { useSelector } from "react-redux";
import { getIsLogged, getUi } from "./store/selectors.jsx";

function App() {
  const isLogged = useSelector(getIsLogged)
  const error = useSelector(getUi)

  return (
    <Routes>
      <Route
        path="/login"
        element={isLogged && !error ? <Navigate to="/" /> : <LoginPage />}
      />

      <Route
        path="/adverts"
        element={
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        }
      >
        <Route index element={<AdvertsList />} />
        <Route path=":id" element={<AdvertDetail />} />
        <Route path="new" element={<NewAdvert />} />
      </Route>

      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<p>404 | Page not found</p>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
