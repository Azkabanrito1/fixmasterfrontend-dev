import { createSlice } from "@reduxjs/toolkit";

const cse = createSlice({
  name: "cse",
  initialState: {
    cseTopics: [],
  },

  reducers: {
    SET_CSE_TOPICS: (state, action) => {
      state.bookingTypes = action.payload;
    },
  },
});

export const { SET_CSE_TOPICS } = cse.actions;

export default cse.reducer;
