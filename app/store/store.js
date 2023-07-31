import { configureStore } from "@reduxjs/toolkit";
import unsplashSlice from "./slices/unsplashSlice";

export const store = configureStore({
  reducer: {
    unsplash: unsplashSlice,
  },
});
