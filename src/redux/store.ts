import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { postsReducer } from "./slices/postsSlice";

export const store = configureStore({
  reducer: { posts: postsReducer, auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


