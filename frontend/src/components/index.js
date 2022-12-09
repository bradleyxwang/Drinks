import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";

import authReducer from "../reducers/auth-reducer";
import apiReducer from "../reducers/api-reducer";

const reducer = combineReducers({
  auth: authReducer,
  api: apiReducer,
});

const store = createStore(reducer);

const MyApp = () => {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
};

export default MyApp;
