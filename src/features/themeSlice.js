import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeOption: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      if (state.themeOption === "dark") {
        state.themeOption = "light";
      } else {
        state.themeOption = "dark";
      }
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.themeOption;

export default themeSlice.reducer;
