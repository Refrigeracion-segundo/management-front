import { createSlice } from "@reduxjs/toolkit";

export interface Slider {
  open: boolean;
}

const initialState: Slider = {
  open: false,
};

export const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    open: (state) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { open: openSlider, close: closeSlider } = sliderSlice.actions;

export default sliderSlice.reducer;
