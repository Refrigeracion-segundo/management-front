import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/login";
import dialogUser from "./slices/dialogUser";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    dialogUser: dialogUser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
