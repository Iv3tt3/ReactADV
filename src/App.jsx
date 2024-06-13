import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AdvertsList } from "./pages/adverts/AdvertsList.jsx";
import { LoginPage } from "./pages/auth/Login";
import { AdvertDetail } from "./pages/adverts/AdvertDetail";
import { NewAdvert } from "./pages/adverts/NewAdvert.jsx";
import { useAuth } from "./pages/auth/context.jsx";
import RequireAuth from "./pages/auth/RequireAuth.jsx";

function App() {
  const { isLogged } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isLogged ? <Navigate to="/" /> : <LoginPage />}
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
