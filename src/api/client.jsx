import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const client = axios.create({
  baseURL,
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // 400/500 server error
      return Promise.reject({
        statusText: error.response.statusText,
        ...error.response,
        ...error.response.data,
      });
    }
    // Request error
    return Promise.reject({ message: error.message });
  }
);

export const setAuthorizationHeader = (token) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common["Authorization"];
};
