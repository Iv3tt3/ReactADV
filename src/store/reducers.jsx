import * as t from "./types";

export const defaultState = {
  auth: false,
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case t.AUTH_LOGIN:
      return true;
    case t.AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}