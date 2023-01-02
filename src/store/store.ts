import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userAftorasationSlice from "./reducers/UserSlice";

const rootReducer = combineReducers({
  userAftorasationSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
