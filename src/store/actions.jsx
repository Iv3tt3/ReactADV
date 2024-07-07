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

export const advertsLoaded = adverts => ({
  type: t.ADVERTS_LOADED,
  payload: adverts,
});

export const advertCreated = advert => ({
  type: t.ADVERTS_CREATED,
  payload: advert,
});