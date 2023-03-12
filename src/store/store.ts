import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../service/authApi";
import { budgetApi } from "../service/budgetApi";
import chatDataSlice from "./reducers/ChatData";
import userAftorasationSlice from "./reducers/UserAftorasationSlice";

export const store = configureStore({
  reducer: {
    ayth: userAftorasationSlice,
    chat: chatDataSlice,
    [authApi.reducerPath]: authApi.reducer,
    [budgetApi.reducerPath]: budgetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, budgetApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
