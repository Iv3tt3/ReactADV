import {
  client,
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";

export const login = (data, checked) => {
  return client.post("api/auth/login", data).then((data) => {
    setAuthorizationHeader(data.accessToken);
    if (checked) {
      storage.set("key", data.accessToken);
    }
  });
};

export const logout = () => {
  storage.remove("key");
  removeAuthorizationHeader();
};
