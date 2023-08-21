import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/login";
import dialogUser from "./slices/dialogUser";
import sliderReducer from "./slices/slider";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    dialogUser: dialogUser,
    slider: sliderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
