import { areAdvertsLoaded, getAdvert, getTagsFromAds } from "./selectors.jsx";
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

export const loadAdverts = () => {
  return async function (dispatch, getState, { services: { adverts } }) {
    try {
      const state = getState();
      if (areAdvertsLoaded(state)) {
        return;
      }
      dispatch(advertsLoadedPending());
      const advertsData = await adverts.getAdverts();
      dispatch(advertsLoadedFulfilled(advertsData));
      dispatch(loadTags());
    } catch (error) {
      dispatch(advertsLoadedRejected(error));
    }
  };
};

export const advertCreatedPending = () => ({
  type: t.ADVERTS_CREATED_PENDING,
});

export const advertCreatedFulfilled = (advert) => ({
  type: t.ADVERTS_CREATED_FULFILLED,
  payload: advert,
});

export const advertCreatedRejected = (error) => ({
  type: t.ADVERTS_CREATED_REJECTED,
  payload: error,
  error: true,
});

export const createAd = (advert) => {
  return async function (
    dispatch,
    getState,
    { services: { adverts }, router }
  ) {
    try {
      dispatch(advertCreatedPending());
      const { id } = await adverts.postAdvert(advert);
      const advertInfo = await adverts.getAdvert(id);
      dispatch(advertCreatedFulfilled(advertInfo));
      router.navigate("/");
    } catch (error) {
      dispatch(advertCreatedRejected(error));
    }
  };
};

export const advertDetailPending = () => ({
  type: t.ADVERT_DETAIL_PENDING,
});

export const advertDetailFulfilled = (advert) => ({
  type: t.ADVERT_DETAIL_FULFILLED,
  payload: advert,
});

export const advertDetailRejected = (error) => ({
  type: t.ADVERT_DETAIL_REJECTED,
  payload: error,
  error: true,
});

export const loadAdvert = (advertId) => {
  return async function (dispatch, getState, { services: { adverts } }) {
    try {
      const state = getState();
      if (getAdvert(advertId)(state)) {
        return;
      }
      dispatch(advertDetailPending());
      const advert = await adverts.getAdvert(advertId);
      dispatch(advertDetailFulfilled(advert));
    } catch (error) {
      dispatch(advertDetailRejected(error));
    }
  };
};

export const advertDelete = (adverts) => ({
  type: t.ADVERT_DELETE,
  payload: adverts,
});

export const advertDeleteRejected = (error) => ({
  type: t.ADVERT_DELETE_REJECTED,
  payload: error,
  error: true,
});

export const deleteAdvert = (advertId) => {
  return async function (
    dispatch,
    getState,
    { services: { adverts }, router }
  ) {
    try {
      const state = getState();
      await adverts.deleteAdvert(advertId);
      const filterAdverts = state.adverts.data.filter(
        (advert) => advert.id !== advertId
      );
      dispatch(advertDelete(filterAdverts));
      dispatch(loadTags());
      router.navigate("/");
    } catch (error) {
      dispatch(advertDeleteRejected(error));
    }
  };
};

export const tagsLoadedPending = () => ({
  type: t.TAGS_LOADED_PENDING,
});

export const tagsLoadedFulfilled = (tags) => ({
  type: t.TAGS_LOADED_FULFILLED,
  payload: tags,
});

export const tagsLoadedRejected = (error) => ({
  type: t.TAGS_LOADED_REJECTED,
  payload: error,
  error: true,
});

export const loadTags = () => {
  return async function (dispatch, getState) {
    try {
      const state = getState();
      //To resolve problem with API. Api returns 4 tags when there is 6 differen tags in my ads. I will use info in redux state and avoid API request

      // if (areTagsLoaded(state)) {
      //   return;
      // }
      //const tagsData = await adverts.getTags();
      dispatch(tagsLoadedPending());
      const tagsData = getTagsFromAds(state);
      dispatch(tagsLoadedFulfilled(tagsData));
    } catch (error) {
      dispatch(tagsLoadedRejected(error));
    }
  };
};

export const selectedTags = (tags) => ({
  type: t.TAGS_SELECTED,
  payload: tags,
});

export const addSelectedTag = (tag) => ({
  type: t.TAGS_SELECTED_ADD,
  payload: tag,
});

export const addTag = (tag) => ({
  type: t.TAGS_ADD,
  payload: tag,
});
