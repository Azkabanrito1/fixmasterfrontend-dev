import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    user: {},
    userDashboard: {},
    sideBarMenu: [],
    qualifications: [],
    userReferrals: {},
    userProfile: {},
    userCard: {},
    promotion: [],
    userRoles: [],
    contactPreferences: [],
  },

  reducers: {
    SET_USER: (state, action) => {
      state.user = action.payload;
    },
    SET_USER_DASHBOARD: (state, action) => {
      state.userDashboard = action.payload;
    },
    SET_SIDE_BAR_MENU: (state, action) => {
      state.sideBarMenu = action.payload;
    },
    SET_USER_REFERRALS: (state, action) => {
      state.userReferrals = action.payload;
    },
    SET_USER_PROFILE: (state, action) => {
      state.userProfile = action.payload;
    },
    SET_QUALIFICATIONS: (state, action) => {
      state.qualifications = action.payload;
    },
    SET_CUSTOMER_USER_CARD: (state, action) => {
      state.userCard = action.payload;
    },
    SET_CONTACT_PREF_OPTIONS: (state, action) => {
      state.contactPreferences = action.payload;
    },
    SET_PROMOTION: (state, action) => {
      state.promotion = action.payload;
    },
    SET_USER_ROLES: (state, action) => {
      state.userRoles = action.payload;
    },
    SET_SUPPLY_REQUEST: (state, action) => {
      state.supplyRequest = action.payload;
    },
  },
});

export const { SET_USER } = user.actions;

export default user.reducer;
