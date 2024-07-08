import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import storage from "./utils/storage.jsx";
import { setAuthorizationHeader } from "./api/client.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import configureStore from "./store/index.jsx";
import { Provider } from "react-redux";

const accessToken = storage.get("key");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const router = createBrowserRouter([{ path: "*", element: <App /> }]);

const store = configureStore({ auth: !!accessToken }, { router });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
