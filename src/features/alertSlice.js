import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  toast: {
    visible: false,
    msg: "",
    type: "",
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    changeLoadingState: (state, action) => {
      state.loading = action.payload || !state.loading;
    },
    showToast: (state, action) => {
      state.toast = { ...state.toast, ...action.payload };
    },
  },
});

export const selectAlert = (state) => state.alert;

export const { changeLoadingState, showToast } = alertSlice.actions;

export default alertSlice.reducer;
