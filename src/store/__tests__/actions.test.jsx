import { advertsLoadedFulfilled, authLoginPending } from '../actions';
import { ADVERTS_LOADED_FULFILLED, AUTH_LOGIN_PENDING } from '../types';
import { describe, expect, it } from "vitest";


describe('authLoginPending', () => {
  it('should return an "AUTH_LOGIN_PENDING" action', () => {
    const expectedAction = {
      type: AUTH_LOGIN_PENDING,
    };
    const action = authLoginPending();
    expect(action).toEqual(expectedAction);
  });
});

describe('advertsLoadedFulfilled', () => {
  it('should return an "ADVERTS_LOADED_FULFILLED" action', () => {
    const adverts = 'adverts'
    const expectedAction = {
      type: ADVERTS_LOADED_FULFILLED,
      payload: adverts
    };
    const action = advertsLoadedFulfilled(adverts);
    expect(action).toEqual(expectedAction);
  });
});