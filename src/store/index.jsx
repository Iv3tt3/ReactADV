import { createStore, combineReducers, bindActionCreators } from "redux";
import * as reducers from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers(reducers);

export default function configureStore(preloadedState) {
  const store = createStore(
    reducer, 
    preloadedState,
    composeWithDevTools( { bindActionCreators })(),
);
  return store;
}

