import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/login";
import dialogUser from "./slices/dialogUser";
import sliderReducer from "./slices/slider";
import dialogSpare from "./slices/dialogSpare";
import dialogClient from "./slices/dialogClient";
import dialogEquipment from "./slices/dialogEquipment";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    dialogUser: dialogUser,
    slider: sliderReducer,
    dialogSpare: dialogSpare,
    dialogClient: dialogClient,
    equipment: dialogEquipment,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
