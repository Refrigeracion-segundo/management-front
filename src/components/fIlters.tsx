"use client";
import { IFilters } from "@/common";
import { STATUS_DATA } from "@/redux/constants";
import { saveSpareFilters } from "@/redux/slices/dialogSpare";
import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export const FiltersComponent = (props: {
  filtersOptions: { filter: string; translate: string }[];
  filters: IFilters;
  cb: (filters: IFilters) => any;
}) => {
  const { filtersOptions, filters, cb } = props;
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const { control } = useForm<{
    filterAutocomplete: any;
    statusAutocomplete: any;
    descriptionFilter: any;
  }>();

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={3}>
        <Controller
          control={control}
          name="filterAutocomplete"
          defaultValue={null}
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
            defaultValue={""}
            render={({ field }) => {
              return (
                <Autocomplete
                  options={Array.from(STATUS_DATA, ([name, value]) => ({
                    name,
                    value,
                  }))}
                  value={field.value}
                  getOptionLabel={(option) => {
                    return option?.value?.translate
                      ? option?.value?.translate
                      : option.translate;
                  }}
                  size="small"
                  onChange={(e, n) => {
                    field.onChange(n);

                    if (n)
                      dispatch(
                        cb({
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
                    if (filter == "") {
                      dispatch(cb({ ...filters, search: undefined, filter }));
                      return;
                    }
                    dispatch(
                      cb({
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
    </Grid>
  );
};
