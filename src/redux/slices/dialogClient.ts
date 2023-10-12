import { IClientRegister, IFilters } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogUser {
  openDialog: boolean;
  isUpdate: boolean;
  dataClient: IClientRegister;
  filters: IFilters;
}

const initialState: DialogUser = {
  openDialog: false,
  isUpdate: false,
  dataClient: {
    name: "",
    contactPerson: "",
    phone: "",
    rfc: "",
    // street: "",
    // streetNumber: "",
    // apartmentNumber: "",
    // zipCode: "",
    // state: "",
    // city: "",
    // suburb: "",
    // stateId: 0,
    fiscalRegime: {
      _id: "",
      status: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      description: "",
      key: 0,
    },
  },
  filters: {
    filter: "",
    search: "",
  },
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
      if (state.isUpdate) state.dataClient = initialState.dataClient;
    },
    isUpdatingClient: (state, value: PayloadAction<boolean>) => {
      state.isUpdate = value.payload;
    },
    saveClient: (state, value: PayloadAction<IClientRegister>) => {
      state.dataClient = value.payload;
    },
    cleanReduxClient: (state) => {
      state = { ...initialState };
    },
    saveFiltersClient: (state, value: PayloadAction<IFilters>) => {
      state.filters = value.payload;
    },
  },
});

export const {
  openClient,
  closeClient,
  isUpdatingClient,
  saveClient,
  cleanReduxClient,
  saveFiltersClient,
} = dialogClientSlice.actions;

export default dialogClientSlice.reducer;
