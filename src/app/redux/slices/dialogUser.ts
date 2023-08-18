import { createSlice } from "@reduxjs/toolkit";

export interface DialogUser {
  openDialog: boolean;
}

const initialState: DialogUser = {
  openDialog: false,
};

export const dialogUserSlice = createSlice({
  name: "dialogUser",
  initialState,
  reducers: {
    open: (state) => {
      state.openDialog = true;
    },
    close: (state) => {
      state.openDialog = false;
    },
  },
});

export const { open, close } = dialogUserSlice.actions;

export default dialogUserSlice.reducer;
