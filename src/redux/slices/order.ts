import {
  IOrderRegister,
  IOrderUpdate,
  IRegimeRegister,
  IRegimeUpdate,
} from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Order {
  openDialog: boolean;
  isUpdate: boolean;
  data: IOrderUpdate | IOrderRegister;
}

const initialState: Order = {
  openDialog: false,
  isUpdate: false,
  data: {
    dateInit: new Date(),
    dateFinish: new Date(),
    client: "",
    description: "",
    observation: "",
    tech: [],
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    openOrder: (state) => {
      console.log(state);
      return {
        ...state,
        openDialog: true,
      };
    },
    closeOrder: (state) => {
      return {
        ...state,
        openDialog: false,
        isUpdate: false,
        data: initialState.data,
      };
    },
    isUpdatingOrder: (state, value: PayloadAction<boolean>) => {
      return {
        ...state,
        isUpdate: value.payload,
      };
    },
    saveOrder: (state, value: PayloadAction<IOrderUpdate | IOrderRegister>) => {
      return {
        ...state,
        data: value.payload,
        isUpdate: true,
        openDialog: true,
      };
    },
    clearOrder: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { openOrder, closeOrder, isUpdatingOrder, saveOrder, clearOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
