import { configureStore, combineReducers } from "@reduxjs/toolkit";
import errorReducer from "./errorSlice";
import settingsReducer from "./settingsSlice";

const rootReducer = combineReducers({
  error: errorReducer,
  settings: settingsReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;