import {
  IServiceDescriptionRegister,
  IServiceDescriptionUpdate,
} from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Service {
  openDialog: boolean;
  isUpdate: boolean;
  data: IServiceDescriptionUpdate | IServiceDescriptionRegister;
}

const initialState: Service = {
  openDialog: false,
  isUpdate: false,
  data: {
    description: "",
    service: {
      _id: "",
      name: "",
      description: "",
      status: "",
      suggestedPrice: 0,
      equipmentCapacity: "",
      equipmentApplication: "",
      equipmentType: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
};

export const serviceDescriptionSlice = createSlice({
  name: "serviceDescription",
  initialState,
  reducers: {
    openServiceDescription: (state) => {
      return {
        ...state,
        openDialog: true,
      };
    },
    closeServiceDescription: (state) => {
      return {
        ...state,
        openDialog: false,
        isUpdate: false,
        data: initialState.data,
      };
    },
    isUpdatingServiceDescription: (state, value: PayloadAction<boolean>) => {
      return {
        ...state,
        isUpdate: value.payload,
      };
    },
    saveServiceDescription: (
      state,
      value: PayloadAction<
        IServiceDescriptionUpdate | IServiceDescriptionRegister
      >
    ) => {
      state.data = value.payload;
    },
    clearServiceDescription: (state) => {
      state.data = initialState.data;
    },
  },
});

export const {
  openServiceDescription,
  closeServiceDescription,
  isUpdatingServiceDescription,
  saveServiceDescription,
  clearServiceDescription,
} = serviceDescriptionSlice.actions;

export default serviceDescriptionSlice.reducer;
