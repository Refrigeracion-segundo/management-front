import { IUserRegister, IUserUpdate } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogUser {
  openDialog: boolean;
  isUpdate: boolean;
  user: IUserRegister | IUserUpdate;
}

const initialState: DialogUser = {
  openDialog: false,
  isUpdate: false,
  user: {
    id: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    roles: [],
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
  },
});

export const {
  open,
  close,
  isUpdating: isUpdatingUser,
  saveUser,
} = dialogUserSlice.actions;

export default dialogUserSlice.reducer;
