import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogUser {
  openDialog: boolean;
  isUpdate: boolean;
}

const initialState: DialogUser = {
  openDialog: false,
  isUpdate: false,
};

export const dialogClientSlice = createSlice({
  name: "dialogClient",
  initialState,
  reducers: {
    openClient: (state) => {
      state.openDialog = true;
    },
    closeClient: (state) => {
      state.openDialog = false;
    },
    isUpdatingClient: (state, value: PayloadAction<boolean>) => {
      state.isUpdate = value.payload;
    },
  },
});

export const { openClient, closeClient, isUpdatingClient } =
  dialogClientSlice.actions;

export default dialogClientSlice.reducer;
