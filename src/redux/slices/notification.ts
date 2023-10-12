import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface NotificationState {
  message: string;
}
const initialState: NotificationState = {
  message: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    viewNotification: (state, value: PayloadAction<string>) => {
      state.message = value.payload;
    },
  },
});

export const { viewNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
