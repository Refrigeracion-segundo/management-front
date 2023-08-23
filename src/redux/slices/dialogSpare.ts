import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogUser {
  openDialog: boolean;
  isUpdate: boolean;
}

const initialState: DialogUser = {
  openDialog: false,
  isUpdate: false,
};

export const dialogSpareSlice = createSlice({
  name: "dialogSpare",
  initialState,
  reducers: {
    openSpare: (state) => {
      state.openDialog = true;
    },
    closeSpare: (state) => {
      state.openDialog = false;
    },
    isUpdatingSpare: (state, value: PayloadAction<boolean>) => {
      state.isUpdate = value.payload;
    },
  },
});

export const { openSpare, closeSpare, isUpdatingSpare } =
  dialogSpareSlice.actions;

export default dialogSpareSlice.reducer;
