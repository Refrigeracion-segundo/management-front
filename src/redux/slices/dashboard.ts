import { IOrderFilters } from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { STATUS_ORIGINAL } from "../constants";

export interface Dashboard {
  openDialog: boolean;
  isUpdate: boolean;
  filters: IOrderFilters;
}

const initialState: Dashboard = {
  openDialog: false,
  isUpdate: false,
  filters: {
    orderId: 0,
    description: "",
    fromDate: new Date(moment().startOf("month").format()),
    toDate: new Date(moment().endOf("month").format()),
    status: STATUS_ORIGINAL.PAID,
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    saveFiltersDashboard: (state, value: PayloadAction<IOrderFilters>) => {
      state.filters = value.payload;
    },
  },
});

export const { saveFiltersDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
