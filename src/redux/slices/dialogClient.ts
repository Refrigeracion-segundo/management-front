import { IClientRegister } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogUser {
  openDialog: boolean;
  isUpdate: boolean;
  dataClient: IClientRegister;
}

const initialState: DialogUser = {
  openDialog: false,
  isUpdate: false,
  dataClient: {
    name: "",
    contactPerson: "",
    phone: "",
    rfc: "",
    street: "",
    streetNumber: "",
    apartmentNumber: "",
    zipCode: "",
    state: "",
    city: "",
    suburb: "",
    fiscalRegime: "",
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
    },
    isUpdatingClient: (state, value: PayloadAction<boolean>) => {
      state.isUpdate = value.payload;
    },
    saveClient: (state, value: PayloadAction<IClientRegister>) => {
      state.dataClient = value.payload;
    },
  },
});

export const { openClient, closeClient, isUpdatingClient, saveClient } =
  dialogClientSlice.actions;

export default dialogClientSlice.reducer;
