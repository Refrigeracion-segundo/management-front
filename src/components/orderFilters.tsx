"use client";
import { saveFilters } from "@/redux/slices/order";
import { RootState } from "@/redux/store";
import { Grid, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const OrderFilters = () => {
  const { filters } = useSelector((store: RootState) => store.order);
  const dispatch = useDispatch();
  //   const debounceTime = 500;

  //   useEffect(() => {
  //     const debounce = setTimeout(() => {
  //         dispat(stateName);
  //       }, debounceTime);

  //       return () => {
  //         clearTimeout(debounce);
  //       };

  //   }, [orderId, description]);
  return (
    <Grid container justifyContent="space-between" spacing={3}>
      <Grid item xs={2}>
        <TextField
          type="number"
          size="small"
          fullWidth
          label="Numero de orden"
          onChange={(e) => {
            const value = e.target.value ? e.target.value : '0'
            dispatch(
              saveFilters({ ...filters, orderId: parseInt(value) })
            )
          }
          }
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          fullWidth
          label="Descripcion"
          onChange={(e) =>
            dispatch(saveFilters({ ...filters, description: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Desde"
            inputFormat={"MM/DD/YYYY"}
            value={filters.fromDate}
            onChange={(value: any) => {
              if (value) {
                dispatch(
                  saveFilters({ ...filters, fromDate: new Date(value) })
                );
              }
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Hasta"
            inputFormat={"MM/DD/YYYY"}
            value={filters.toDate}
            onChange={(value: any) => {
              if (value) {
                dispatch(saveFilters({ ...filters, toDate: new Date(value) }));
              }
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" />
            )}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};
