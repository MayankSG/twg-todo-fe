import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: null,
    sideNave: false,
  },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    changeSideNav(state) {
      state.sideNave = !state.sideNave;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
