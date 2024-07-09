// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (router, redirectMap) => (store) => (next) => (action) => {
  const result = next(action);

  if (!action.error) {
    return result;
  }
  const redirect = redirectMap[action.payload.status]
  if (redirect) {
    router.navigate(redirect);
  }
  return result;
};
