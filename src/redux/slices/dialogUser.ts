import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogUser {
  openDialog: boolean;
  isUpdate: boolean;
}

const initialState: DialogUser = {
  openDialog: false,
  isUpdate: false,
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
    isUpdating: (state, value: PayloadAction<boolean>) => {
      state.isUpdate = value.payload;
    },
  },
});

export const {
  open,
  close,
  isUpdating: isUpdatingUser,
} = dialogUserSlice.actions;

export default dialogUserSlice.reducer;
