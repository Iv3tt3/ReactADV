import { getIsLogged } from '../selectors';
import { describe, expect, it } from "vitest";


describe('getIsLogged', () => {
  const state = { auth: false };

  it('should return a boolean', () => {
    expect(getIsLogged(state)).toBe(false);
  });

});