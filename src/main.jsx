import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import storage from "./utils/storage.jsx";
import { setAuthorizationHeader } from "./api/client.jsx";
import { AuthContextProvider } from "./pages/auth/context.jsx";
import { BrowserRouter } from "react-router-dom";

const accessToken = storage.get("key");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider isDefaultLogged={!!accessToken}>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
