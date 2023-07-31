import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPhotosLoading: false,
  userData: null,
  error: null,
};

export const unsplashSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setPhotosLoading: (state) => {
      state.isPhotosLoading = true;
    },
    setPhotosLoadingSuccess: (state) => {
      state.isPhotosLoading = false;
    },
    setPhotosLoadingFailure: (state, action) => {
      state.isPhotosLoading = false;
      state.error = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPhotosLoading,
  setPhotosLoadingFailure,
  setPhotosLoadingSuccess,
  setUserData,
} = unsplashSlice.actions;

export default unsplashSlice.reducer;
