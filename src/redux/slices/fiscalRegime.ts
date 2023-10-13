import { IRegimeRegister, IRegimeUpdate } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FiscalRegime {
  openDialog: boolean;
  isUpdate: boolean;
  data: IRegimeUpdate | IRegimeRegister;
}

const initialState: FiscalRegime = {
  openDialog: false,
  isUpdate: false,
  data: {
    description: "",
    key: 0,
  },
};

export const fiscalRegimeSlice = createSlice({
  name: "fiscalRegime",
  initialState,
  reducers: {
    openFiscalRegime: (state) => {
      return {
        ...state,
        openDialog: true,
      };
    },
    closeFiscalRegime: (state) => {
      state.openDialog = false;
      state.isUpdate = false;
      state.data.description = "";
      state.data.key = 0;
    },
    isUpdatingFiscalRegime: (state, value: PayloadAction<boolean>) => {
      state.isUpdate = value.payload;
      // return {
      //   ...state,
      //   isUpdate: value.payload,
      // };
    },
    saveFiscalRegime: (
      state,
      value: PayloadAction<IRegimeUpdate | IRegimeRegister>
    ) => {
      return {
        ...state,
        data: value.payload,

        openDialog: true,
      };
    },
    clearFiscalRegime: (state) => {
      state.data.description = "";
      state.data.key = 0;
      // state.openDialog = false;
    },
  },
});

export const {
  openFiscalRegime,
  closeFiscalRegime,
  isUpdatingFiscalRegime,
  saveFiscalRegime,
  clearFiscalRegime,
} = fiscalRegimeSlice.actions;

export default fiscalRegimeSlice.reducer;
