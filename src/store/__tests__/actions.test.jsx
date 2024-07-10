import { advertsLoadedFulfilled, authLogin, authLoginFulfilled, authLoginPending, authLoginRejected } from '../actions';
import { ADVERTS_LOADED_FULFILLED, AUTH_LOGIN_PENDING } from '../types';
import { afterEach, describe, expect, it, vi } from "vitest";


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

describe('authLogin', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const credentials = 'credentials';
  const checked = 'checked'
  const action = authLogin(credentials, checked);

  const redirectUrl = 'redirectUrl';
  const dispatch = vi.fn();
  const services = { auth: {} };
  const router = {
    state: { location: { state: { pathname: redirectUrl } } },
    navigate: vi.fn(),
  };

  it('when login resolves should follow the login flow', async () => {
    services.auth.login = vi.fn().mockResolvedValue();

    await action(dispatch, undefined, { services, router });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
    expect(services.auth.login).toHaveBeenCalledWith(credentials, checked);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFulfilled());
    expect(router.navigate).toHaveBeenCalledWith(redirectUrl);
  });

  it('when login rejects should follow the error flow', async () => {
    const error = new Error('Unauthorized');
    services.auth.login = vi.fn().mockRejectedValue(error);

    await action(dispatch, undefined, { services, router });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
    expect(services.auth.login).toHaveBeenCalledWith(credentials, checked);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginRejected(error));
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
