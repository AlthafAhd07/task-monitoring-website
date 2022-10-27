import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import themeReducer from "../features/themeSlice";
import authReducer from "../features/authSlice";
import alertReducer from "../features/alertSlice";
export const store = configureStore({
  reducer: {
    todo: todoReducer,
    theme: themeReducer,
    userAuth: authReducer,
    alert: alertReducer,
  },
});
