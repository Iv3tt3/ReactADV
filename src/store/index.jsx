import { createStore, combineReducers } from "redux";
import * as reducers from "./reducers";

const reducer = combineReducers(reducers);

export default function configureStore(preloadedState) {
  const store = createStore(
    reducer, 
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__());
  return store;
}

