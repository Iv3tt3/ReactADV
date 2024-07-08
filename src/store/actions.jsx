import { areAdvertsLoaded, getAdvert } from "./selectors.jsx";
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
  return async function (dispatch, _getState, { services: { auth }, router }) {
    try {
      dispatch(authLoginPending());
      await auth.login(credentials, checked);
      dispatch(authLoginFulfilled());
      router.navigate(router.state.location.state?.pathname || "/");
    } catch (error) {
      dispatch(authLoginRejected(error));
      console.log(error);
    }
  };
};

export const authLogout = () => ({
  type: t.AUTH_LOGOUT,
});

export const logoutAction = () => {
  return function (dispatch, getState, { services: { auth } }) {
    auth.logout();
    dispatch(authLogout());
  };
};

export const uiResetError = () => ({
  type: t.UI_RESET_ERROR,
});

export const advertsLoadedPending = () => ({
  type: t.ADVERTS_LOADED_PENDING,
});

export const advertsLoadedFulfilled = (adverts) => ({
  type: t.ADVERTS_LOADED_FULFILLED,
  payload: adverts,
});

export const advertsLoadedRejected = (error) => ({
  type: t.ADVERTS_LOADED_REJECTED,
  payload: error,
  error: true,
});

export const advertCreated = (advert) => ({
  type: t.ADVERTS_CREATED,
  payload: advert,
});

export const loadAdverts = () => {
  return async function (dispatch, getState, { services: { adverts } }) {
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
      console.log(error);
    }
  };
};

export const createAd = (advert) => {
  return async function (dispatch, getState, { services: { adverts }, router }) {
    const { id } = await adverts.postAdvert(advert);
    const advertInfo = await adverts.getAdvert(id);
    dispatch(advertCreated(advertInfo));
    router.navigate("/");
  };
};

export const advertDetail = (advert) => ({
  type: t.ADVERT_DETAIL,
  payload: advert,
});

export const loadAdvert = (advertId) => {
  return async function (dispatch, getState, { services: { adverts } }) {
    const state = getState();
    if (getAdvert(advertId)(state)) {
      return
    }
    const advert = await adverts.getAdvert(advertId);
    dispatch(advertDetail(advert));
  };
};
