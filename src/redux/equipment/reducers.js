import { createSlice } from "@reduxjs/toolkit";

const equipment = createSlice({
  name: "equipment",
  initialState: {
    bookingTypes: [],
    bookingClasses: [],
    bookingCategories: [],
    notificationOptions: [],
    contactPreference: [],
  },

  reducers: {
    SET_BOOKING_TYPES: (state, action) => {
      state.bookingTypes = action.payload;
    },
    SET_BOOKING_CLASSES: (state, action) => {
      state.bookingClasses = action.payload;
    },
    SET_BOOKING_CATEGORIES: (state, action) => {
      state.bookingCategories = action.payload;
    },
    SET_NOTIFICATION_OPTIONS: (state, action) => {
      state.notificationOptions = action.payload;
    },
    SET_CONTACT_PREFERENCE: (state, action) => {
      state.contactPreference = action.payload;
    },
  },
});

export const {} = equipment.actions;

export default equipment.reducer;
