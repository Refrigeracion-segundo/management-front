import { IFilters, IUserRegister, IUserUpdate } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogUser {
  openDialog: boolean;
  isUpdate: boolean;
  user: IUserRegister | IUserUpdate;
  filters: IFilters;
}

const initialState: DialogUser = {
  openDialog: false,
  isUpdate: false,
  user: {
    name: "",
    lastName: "",
    email: "",
    password: "",
    roles: [],
  },
  filters: {
    filter: "",
    search: "",
  },
};

export const dialogUserSlice = createSlice({
  name: "dialogUser",
  initialState,
  reducers: {
    open: (state) => {
      state.openDialog = true;
    },
    close: (state) => {
      state.openDialog = false;
      state.isUpdate = false;
      state.user = initialState.user;
    },
    saveUser: (state, value: PayloadAction<IUserRegister | IUserUpdate>) => {
      return {
        ...state,
        user: value.payload,
      };
    },
    isUpdating: (state, value: PayloadAction<boolean>) => {
      state.isUpdate = value.payload;
    },
    cleanReduxUser: (state) => {
      state = { ...initialState };
    },
    saveUserFilters: (state, value: PayloadAction<IFilters>) => {
      state.filters = value.payload;
    },
  },
});

export const {
  open,
  close,
  isUpdating: isUpdatingUser,
  saveUser,
  cleanReduxUser,
  saveUserFilters,
} = dialogUserSlice.actions;

export default dialogUserSlice.reducer;
