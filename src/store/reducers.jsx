import * as t from "./types";

export const defaultState = {
  auth: false,
  adverts: {
    loaded: false,
    data: [],
  },
  ui: {
    pending: false,
    error: null,
  },
  tags: {
    loaded: false,
    data: [],
    filtered: [],
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
    case t.ADVERTS_LIST_PENDING:
      return { ...state, loaded: true };
    case t.ADVERTS_LIST_FULFILLED:
      return { ...state, data: action.payload, ...state.data };
    case t.ADVERTS_LIST_REJECTED:
      return { ...state, data: action.payload, ...state.data };
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
    case t.TAGS_LIST_PENDING:
      return { ...state, loaded: true };
    case t.TAGS_LIST_FULFILLED:
      return { ...state, data: action.payload, ...state.data };
    case t.TAGS_LIST_REJECTED:
      return { ...state, data: action.payload, ...state.data };
    case t.TAGS_LIST_SELECTED: 
      return { ...state, filtered: action.payload, ...state.data };
    default:
      return state;
  }
}
