import { IEquipmentRegister, IEquipmentUpdate, IFilters } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogUser {
  openDialog: boolean;
  isUpdate: boolean;
  data: IEquipmentUpdate | IEquipmentRegister;
  filters: IFilters;
}

const initialState: DialogUser = {
  openDialog: false,
  isUpdate: false,
  data: {
    name: "",
  },
  filters: {
    filter: "",
    search: "",
  },
};

export const dialogEquipmentSlice = createSlice({
  name: "dialogEquipment",
  initialState,
  reducers: {
    openEquipment: (state) => {
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
        openDialog: true,
      };
    },
    saveEquipment: (
      state,
      value: PayloadAction<IEquipmentUpdate | IEquipmentRegister>
    ) => {
      return {
        ...state,
        data: value.payload,
        // isUpdate: true,
        // openDialog: true,
      };
    },
    clearEquipment: (state) => {
      return {
        ...initialState,
      };
    },
    saveEquipmentFilters: (state, value: PayloadAction<IFilters>) => {
      state.filters = value.payload;
    },
  },
});

export const {
  openEquipment,
  closeEquipment,
  isUpdatingEquipment,
  saveEquipment,
  clearEquipment,
  saveEquipmentFilters,
} = dialogEquipmentSlice.actions;

export default dialogEquipmentSlice.reducer;
