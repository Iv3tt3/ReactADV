// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (router) => (store) => (next) => (action) => {
  const result = next(action);

  if (!action.error) {
    return result;
  }
  if (action.payload.status === 401) {
    router.navigate("/login");
  }
  if (action.payload.status === 404) {
    router.navigate("/404");
  }
  return result;
};
