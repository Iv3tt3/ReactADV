import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import { withExtraArgument } from "redux-thunk";

import * as reducers from "./reducers";
import * as actionCreators from "./actions";
import * as auth from "../pages/auth/service";
import * as adverts from "../pages/adverts/service";


const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({ actionCreators });

export default function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(withExtraArgument({ services: { auth, adverts } })))
  );
  return store;
}
