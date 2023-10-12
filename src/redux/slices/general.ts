import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GeneralState {
  path: string;
}
const initialState: GeneralState = {
  path: "",
};

export const generalApp = createSlice({
  name: "generalApp",
  initialState,
  reducers: {
    changePath: (state, value: PayloadAction<string>) => {
      state.path = value.payload;
    },
  },
});

export const { changePath } = generalApp.actions;
export default generalApp.reducer;
