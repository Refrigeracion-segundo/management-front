import { IFilters, ISpareRegister, ISpareUpdate } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogSpare {
  openDialog: boolean;
  isUpdate: boolean;
  spare: ISpareRegister | ISpareUpdate;
  filters: IFilters;
}

const initialState: DialogSpare = {
  openDialog: false,
  isUpdate: false,
  spare: {
    description: "",
    suggestedPrice: 0,
  } as ISpareRegister,
  filters: {
    filter: "",
    search: "",
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
    cleanReduxSpare: (state) => {
      state = { ...initialState };
    },
    saveSpareFilters: (state, value: PayloadAction<IFilters>) => {
      state.filters = value.payload;
    },
  },
});

export const {
  openSpare,
  closeSpare,
  isUpdatingSpare,
  saveSpare,
  cleanReduxSpare,
  saveSpareFilters,
} = dialogSpareSlice.actions;

export default dialogSpareSlice.reducer;
