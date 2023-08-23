import { IEquipmentRegister, IEquipmentUpdate } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogUser {
  openDialog: boolean;
  isUpdate: boolean;
  data: IEquipmentUpdate | IEquipmentRegister;
}

const initialState: DialogUser = {
  openDialog: false,
  isUpdate: false,
  data: {
    name: "",
  },
};

export const dialogEquipmentSlice = createSlice({
  name: "dialogEquipment",
  initialState,
  reducers: {
    openEquipment: (state) => {
      console.log(state);
      return {
        ...state,
        openDialog: true,
      };
    },
    closeEquipment: (state) => {
      return {
        ...state,
        openDialog: false,
        isUpdate: false,
        data: {
          name: "",
        },
      };
    },
    isUpdatingEquipment: (state, value: PayloadAction<boolean>) => {
      return {
        ...state,
        isUpdate: value.payload,
      };
    },
    saveEquipment: (
      state,
      value: PayloadAction<IEquipmentUpdate | IEquipmentRegister>
    ) => {
      return {
        ...state,
        data: value.payload,
        isUpdate: true,
        openDialog: true,
      };
    },
    clearEquipment: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  openEquipment,
  closeEquipment,
  isUpdatingEquipment,
  saveEquipment,
  clearEquipment,
} = dialogEquipmentSlice.actions;

export default dialogEquipmentSlice.reducer;
