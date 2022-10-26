import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login: {
      reducer: (state, action) => {
        state.user = action.payload;
      },
      prepare: (uid, displayName, email, photoURL) => {
        return {
          payload: {
            uid,
            displayName,
            email,
          },
        };
      },
    },
    logout: (state) => {
      state.user = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state) => state.userAuth;

export default authSlice.reducer;
