import * as t from "./types";

export const defaultState = {
  auth: false,
  ui: {
    pending: false,
    error: null,
  },
  adverts: {
    loaded: false,
    data: [],
  },
  tags: {
    loaded: false,
    data: [],
    selected: [],
  },
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case t.AUTH_LOGIN_FULFILLED:
      return true;
    case t.AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function adverts(state = defaultState.adverts, action) {
  switch (action.type) {
    case t.ADVERTS_LOADED_FULFILLED:
      return { ...state, loaded: true, data: action.payload };
    case t.ADVERTS_CREATED_FULFILLED:
      return { ...state, data: [...state.data, action.payload] };
    case t.ADVERT_DETAIL_FULFILLED:
      return { ...state, data: [action.payload] };
    case t.ADVERT_DELETE:
      return {
        ...state,
        data: [
          ...state.data.filter((item) => {
            item !== action.payload;
          }),
        ],
      };
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return { ...state, pending: false, error: action.payload };
  }

  if (action.type === t.UI_RESET_ERROR) {
    return { ...state, error: null };
  }

  if (action.type.endsWith("/pending")) {
    return { ...state, pending: true };
  }

  if (action.type.endsWith("/fulfilled")) {
    return { ...state, pending: false, error: null };
  }

  return state;
}

export function tags(state = defaultState.tags, action) {
  switch (action.type) {
    case t.TAGS_LOADED_FULFILLED:
      return { ...state, loaded: true, data: action.payload };
    case t.TAGS_ADD:
      return { ...state, data: [...state.data, action.payload]}
    case t.TAGS_SELECTED:
      return { ...state, selected: action.payload };
    case t.TAGS_SELECTED_ADD:
      return { ...state, selected: [...state.selected, action.payload] };
    default:
      return state;
  }
}
