import { IEquipmentResponse, IServiceRegister, IServiceUpdate } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Service {
  openDialog: boolean;
  isUpdate: boolean;
  data: IServiceUpdate | IServiceRegister;
}

const initialState: Service = {
  openDialog: false,
  isUpdate: false,
  data: {
    name: "",
    description: "",
    suggestedPrice: 0,
    equipmentCapacity: "",
    equipmentApplication: "",
    equipmentType: {
      _id: "",
      name: "",
      status: "",
      createdAt: 0,
      updatedAt: 0,
    } as any as IEquipmentResponse,
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
      state.data = initialState.data;
    },
  },
});

export const {
  openService,
  closeService,
  isUpdatingService,
  saveService,
  clearService,
} = serviceSlice.actions;

export default serviceSlice.reducer;
