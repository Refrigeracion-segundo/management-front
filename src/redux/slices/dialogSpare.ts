import { ISpareRegister, ISpareUpdate } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogUser {
  openDialog: boolean;
  isUpdate: boolean;
  spare: ISpareRegister | ISpareUpdate;
}

const initialState: DialogUser = {
  openDialog: false,
  isUpdate: false,
  spare: {
    description: "",
    suggestedPrice: 0,
  },
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
      state.isUpdate = false;
      state.spare = initialState.spare;
    },
    saveSpare: (state, value: PayloadAction<ISpareRegister | ISpareUpdate>) => {
      return {
        ...state,
        spare: value.payload,
      };
    },
    isUpdatingSpare: (state, value: PayloadAction<boolean>) => {
      state.isUpdate = value.payload;
    },
  },
});

export const { openSpare, closeSpare, isUpdatingSpare, saveSpare } =
  dialogSpareSlice.actions;

export default dialogSpareSlice.reducer;
