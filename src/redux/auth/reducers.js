import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    errorMsg: "",
    auth: {},
  },

  reducers: {
    LOADING: (state) => {
      state.isLoading = true;
    },
    STOP_LOADING: (state) => {
      state.isLoading = false;
    },
    SET_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SET_AUTH: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { LOADING, STOP_LOADING, SET_LOADING, SET_AUTH } = auth.actions;

export default auth.reducer;
