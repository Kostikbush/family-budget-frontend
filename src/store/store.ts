import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../service/authApi";

import userAftorasationSlice from "./reducers/UserSlice";

export const store = configureStore({
  reducer: {
    ayth: userAftorasationSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
