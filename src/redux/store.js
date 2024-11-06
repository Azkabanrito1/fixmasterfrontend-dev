import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import rootReducers from "./rootReducers";

const store = configureStore({
  reducer: rootReducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunkMiddleware],
});

export { store };
