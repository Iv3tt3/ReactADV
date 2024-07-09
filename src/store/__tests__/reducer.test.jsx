import { describe, expect, it } from "vitest";
import { authLoginFulfilled, authLogout } from "../actions";
import { auth, defaultState } from '../reducers';

describe('auth', () => {
    it('should manage "AUTH_LOGIN_FULFILLED" action', () => {
      const state = defaultState.auth;
      const action = authLoginFulfilled();
      expect(auth(state, action)).toBe(true);
    });
  
    it('should manage "AUTH_LOGOUT" action', () => {
      const state = defaultState.auth;
      const action = authLogout();
      expect(auth(state, action)).toBe(false);
    });
  
    it('should manage "ANY" action', () => {
      const state = defaultState.auth;
      const action = { type: 'ANY' };
      expect(auth(state, action)).toBe(state);
    });
  
    it('should manage "ANY" action when state is not defined', () => {
      const state = undefined;
      const action = { type: 'ANY' };
      expect(auth(state, action)).toBe(defaultState.auth);
    });
  });
  