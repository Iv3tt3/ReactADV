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
  return async function (dispatch, _getState, { services: { auth } }) {
    try {
      dispatch(authLoginPending());
      await auth.login(credentials, checked);
      dispatch(authLoginFulfilled());
    } catch (error) {
      dispatch(authLoginRejected(error));
      console.log(error);
    }
  };
};

export const authLogout = () => ({
  type: t.AUTH_LOGOUT,
});

export const advertsListPending = () => ({
  type: t.ADVERTS_LIST_PENDING,
});

export const advertsListFulfilled = (adverts) => ({
  type: t.ADVERTS_LIST_FULFILLED,
  payload: adverts,
});

export const advertsListRejected = (error) => ({
  type: t.ADVERTS_LIST_REJECTED,
  payload: error,
  error: true,
});

export const getListAdverts = () => {
  return async function (dispatch, getState, { services }) {
    const state = getState();
    if (areAdvertsLoaded(state)) {
      return;
    }
    try {
      dispatch(advertsListPending());
      const adverts = await services.adverts.getAdverts();
      dispatch(advertsListFulfilled(adverts));
    } catch (error) {
      dispatch(advertsListRejected(error));
    }
  };
};

export const uiResetError = () => ({
  type: t.UI_RESET_ERROR,
});

export const tagsListPending = () => ({
  type: t.TAGS_LIST_PENDING,
});

export const tagsListFulfilled = (tags) => ({
  type: t.TAGS_LIST_FULFILLED,
  payload: tags,
});

export const tagsListRejected = (error) => ({
  type: t.TAGS_LIST_REJECTED,
  payload: error,
  error: true,
});

export const getAdvertTags = () => {
  return async function (dispatch, getState, { services }) {
    // const state = getState();
    // if (areTagsLoaded(state)) {
    //   return;
    // }
    try {
      dispatch(tagsListPending());
      const tags = await services.adverts.getTags();
      console.log(tags)
      dispatch(tagsListFulfilled(tags));
    } catch (error) {
      dispatch(tagsListRejected(error));
    }
  };
};

export const selectedTags = (tag) => ({
  type: t.TAGS_LIST_SELECTED,
  payload: tag,
});