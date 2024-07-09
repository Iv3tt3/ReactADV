import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { withExtraArgument } from "redux-thunk";

import * as reducers from "./reducers";
import * as actionCreators from "./actions";
import * as auth from "../pages/auth/service";
import * as adverts from "../pages/adverts/service";
import { errorMiddleware } from "./middlewares";

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({ actionCreators });

export default function configureStore(preloadedState, { router }) {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        withExtraArgument({ services: { auth, adverts }, router }),
        errorMiddleware(router, {
          401: "/login",
          404: "/404",
        })
      )
    )
  );
  return store;
}
