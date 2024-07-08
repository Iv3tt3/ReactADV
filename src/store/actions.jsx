import { areAdvertsLoaded } from "./selectors.jsx";
import * as t from "./types.jsx";

export const authLoginPending = () => ({
  type: t.AUTH_LOGIN_PENDING,
});

export const authLoginFulfilled = () => ({
  type: t.AUTH_LOGIN_FULFILLED,
});

export const authLoginRejected = (error) => ({
  type: t.AUTH_LOGIN_REJECTED,
  payload: error,
  error: true,
});

export const authLogin = (credentials, checked) => {
  return async function (dispatch, _getState, { services: {auth} }) {
    try {
      dispatch(authLoginPending());
      await auth.login(credentials, checked);
      dispatch(authLoginFulfilled());
    } catch (error) {
      dispatch(authLoginRejected(error));
      console.log(error)
    }
  };
};

export const authLogout = () => ({
  type: t.AUTH_LOGOUT,
});

export const uiResetError = () => ({
  type: t.UI_RESET_ERROR,
});

export const advertsLoadedPending = () => ({
  type: t.ADVERTS_LOADED_PENDING,
});

export const advertsLoadedFulfilled = adverts => ({
  type: t.ADVERTS_LOADED_FULFILLED,
  payload: adverts,
});

export const advertsLoadedRejected = error => ({
  type: t.ADVERTS_LOADED_REJECTED,
  payload: error,
  error: true
});

export const advertCreated = advert => ({
  type: t.ADVERTS_CREATED,
  payload: advert,
});

export const loadAdverts = () => {
  return async function (dispatch, getState, { services: { adverts }}) {
    const state = getState();
    if (areAdvertsLoaded(state)) {
      return;
    }
    try {
      dispatch(advertsLoadedPending());
      const advertsData = await adverts.getAdverts();
      dispatch(advertsLoadedFulfilled(advertsData));
    } catch (error) {
      dispatch(advertsLoadedRejected(error));
      console.log(error)
    }
  };
};