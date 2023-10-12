"use client";
import { STATUS } from "@/redux/constants";
import { saveFilters } from "@/redux/slices/order";
import { RootState } from "@/redux/store";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export const OrderFilters = (props: { status: string }) => {
  const { filters } = useSelector((store: RootState) => store.order);
  const [filter, setFilter] = useState(props.status ? "status" : "");
  const dispatch = useDispatch();
  const { control } = useForm<{
    filterAutocomplete: any;
    statusAutocomplete: any;
    descriptionFilter: any;
  }>();
  useEffect(() => {
    if (props.status !== "") {
      dispatch(
        saveFilters({ ...filters, filter: "status", search: props.status })
      );
    }
  }, [props.status]);

  const filtersOptions = [
    { filter: "status", translate: "Estatus" },
    { filter: "description", translate: "Descripción" },
    { filter: "customer", translate: "Cliente" },
  ];

  return (
    <Grid container justifyContent="space-between" spacing={3}>
      <Grid item xs={1.5}>
        <TextField
          type="number"
          size="small"
          fullWidth
          label="Numero de orden"
          onChange={(e) => {
            const value = e.target.value ? e.target.value : "0";
            dispatch(saveFilters({ ...filters, orderId: parseInt(value) }));
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          control={control}
          name="filterAutocomplete"
          defaultValue={
            props.status !== ""
              ? { filter: "status", translate: "Estatus" }
              : null
          }
          render={({ field }) => {
            return (
              <Autocomplete
                options={filtersOptions}
                value={field.value}
                getOptionLabel={(option) => option.translate}
                size="small"
                onChange={(e, n) => {
                  field.onChange(n);
                  setFilter(n.filter);
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Filtrar por" />
                )}
              />
            );
          }}
        />
      </Grid>
      <Grid item xs={3}>
        {filter == "status" ? (
          <Controller
            control={control}
            name="statusAutocomplete"
            defaultValue={props.status !== "" ? STATUS.get(props.status) : ""}
            render={({ field }) => {
              return (
                <Autocomplete
                  options={Array.from(STATUS, ([name, value]) => ({
                    name,
                    value,
                  }))}
                  value={field.value}
                  getOptionLabel={(option) => {
                    // console.log(option);
                    return option?.value?.translate
                      ? option?.value?.translate
                      : option.translate;
                  }}
                  size="small"
                  onChange={(e, n) => {
                    field.onChange(n);
                    // console.log(n);
                    dispatch(
                      saveFilters({
                        ...filters,
                        search: n.name,
                        filter: "status",
                      })
                    );
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Filtrar por" />
                  )}
                />
              );
            }}
          />
        ) : (
          <Controller
            control={control}
            name="descriptionFilter"
            // defaultValue={""}
            render={({ field }) => {
              // console.log(field.value);
              return (
                <TextField
                  size="small"
                  fullWidth
                  value={typeof field.value == "string" ? field.value : ""}
                  label={
                    filtersOptions.find((f) => f.filter === filter)?.translate
                  }
                  onChange={(e) => {
                    field.onChange(e);
                    if (filter == "") return;
                    dispatch(
                      saveFilters({
                        ...filters,
                        search: e.target.value,
                        filter,
                      })
                    );
                  }}
                />
              );
            }}
          />
        )}
      </Grid>
      <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Desde"
            inputFormat={"MM/DD/YYYY"}
            value={filters.fromDate}
            onChange={(value: any) => {
              // console.log(value);
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
      <Grid item xs={2}>
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
