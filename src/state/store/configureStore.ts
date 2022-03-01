import { createStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userReducer } from '../reducers/userReducer';
const middleware = [thunk];
const appReducer = combineReducers({
    users: userReducer,
  });

  export const store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );