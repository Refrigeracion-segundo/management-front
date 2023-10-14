import { IFilters, IServiceRegister, IServiceUpdate } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Service {
  openDialog: boolean;
  isUpdate: boolean;
  data: IServiceUpdate | IServiceRegister;
  filters: IFilters;
}

const initialState: Service = {
  openDialog: false,
  isUpdate: false,
  data: {
    description: "",
  },
  filters: {
    search: "",
    filter: "",
  },
};

export const serviceSlice = createSlice({
  name: "fiscalRegime",
  initialState,
  reducers: {
    openService: (state) => {
      return {
        ...state,
        openDialog: true,
      };
    },
    closeService: (state) => {
      return {
        ...state,
        openDialog: false,
        isUpdate: false,
        data: initialState.data,
      };
    },
    isUpdatingService: (state, value: PayloadAction<boolean>) => {
      return {
        ...state,
        isUpdate: value.payload,
      };
    },
    saveService: (
      state,
      value: PayloadAction<IServiceUpdate | IServiceRegister>
    ) => {
      return {
        ...state,
        data: value.payload,

        // openDialog: true,
      };
    },
    clearService: (state) => {
      state.data = { description: "" };
    },
    saveFiltersService: (state, value: PayloadAction<IFilters>) => {
      state.filters = value.payload;
    },
  },
});

export const {
  openService,
  closeService,
  isUpdatingService,
  saveService,
  clearService,
  saveFiltersService,
} = serviceSlice.actions;

export default serviceSlice.reducer;
