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
      return {
        ...state,
        openDialog: false,
        isUpdate: false,
        data: initialState.data,
      };
    },
    isUpdatingFiscalRegime: (state, value: PayloadAction<boolean>) => {
      return {
        ...state,
        isUpdate: value.payload,
      };
    },
    saveFiscalRegime: (
      state,
      value: PayloadAction<IRegimeUpdate | IRegimeRegister>
    ) => {
      return {
        ...state,
        data: value.payload,
        isUpdate: true,
        openDialog: true,
      };
    },
    clearFiscalRegime: (state) => {
      return {
        ...initialState,
      };
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
