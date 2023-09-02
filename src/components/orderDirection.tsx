"use client";
import { ICities, ICityState, IOrderDirection } from "@/common";
import {
  useLazyFindCitiesQuery,
  useLazyFindStateQuery,
} from "@/redux/api/countryState.api";
import { saveDirection } from "@/redux/slices/order";
import { RootState } from "@/redux/store";
import { Autocomplete, Grid, TextField, Divider, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export const OrderDirection = () => {
  const { direction, isUpdate, client } = useSelector(
    (store: RootState) => store.order
  );
  const dispatch = useDispatch();
  const debounceTime = 500;
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const {
    formState: { errors },
    // register,
    handleSubmit,
    control,
  } = useForm<IOrderDirection>({ values: direction });

  const [
    getCities,
    {
      isLoading: isLoadingCities,
      data: dataCities,
      isSuccess: isSuccessCities,
    },
  ] = useLazyFindCitiesQuery();

  const [
    getState,
    { isLoading: isLoadingState, data: dataState, isSuccess: isSuccessState },
  ] = useLazyFindStateQuery();

  useEffect(() => {
    const debounce = setTimeout(() => {
      getState(stateName);
    }, debounceTime);

    return () => {
      clearTimeout(debounce);
    };
  }, [stateName]);

  useEffect(() => {
    getCities({
      stateId: direction.state ? (direction.stateId as number) : 0,
      name: cityName,
    });
  }, [cityName, direction.state]);

  return (
    <Grid
      item
      container
      spacing={2}
      columnSpacing={2}
      justifyContent="space-between"
      xs={12}
    >
      <br />
      <br />
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      <Grid item xs={4}>
        <TextField
          disabled
          value="México"
          variant="standard"
          margin="dense"
          id="pais"
          label="Pais"
          type="text"
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name="state"
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={{
            id: direction.stateId as number,
            name: direction.state as string,
          }}
          render={({ field }) => (
            <Autocomplete
              value={field.value}
              loading={isLoadingState}
              options={
                isSuccessState && dataState?.items
                  ? dataState.items
                  : ([] as any)
              }
              onChange={(_, newValue) => {
                field.onChange(newValue);
                dispatch(
                  saveDirection({
                    ...direction,
                    state: (newValue as ICityState).name,
                    stateId: (newValue as ICityState).id,
                  })
                );
              }}
              getOptionLabel={(option) => {
                return typeof option == "string" ? option : option.name;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ciudad"
                  variant="standard"
                  margin="dense"
                  onChange={(e) => {
                    setStateName(e.target.value);
                  }}
                />
              )}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name="city"
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={{
            id: direction.cityId as number,
            name: direction.city as string,
          }}
          render={({ field }) => (
            <Autocomplete
              value={field.value}
              loading={isLoadingCities}
              options={isSuccessCities && dataCities ? dataCities.items : []}
              onChange={(_, newValue) => {
                field.onChange(newValue);
              }}
              getOptionLabel={(option) => {
                return typeof option == "string" ? option : option.name;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ciudad"
                  variant="standard"
                  margin="dense"
                  onChange={(e) => {
                    setCityName(e.target.value);
                  }}
                />
              )}
            />
          )}
        />
      </Grid>

      <Grid item xs={4}>
        <Controller
          name="zipCode"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Código postal invalido",
            },
            pattern: {
              value: /^\d{5}$/,
              message: "Código postal invalido",
            },
            minLength: {
              value: 5,
              message: "La minima longitud es de 5 caracteres.",
            },
            maxLength: {
              value: 5,
              message: "La maxima longitud es de 5 caracteres.",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Codigo postal"
              variant="standard"
              margin="dense"
              fullWidth
              error={!!errors.zipCode}
              helperText={!!errors.zipCode && errors.zipCode.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="suburb"
          control={control}
          rules={{
            required: {
              value: false,
              message: "La colonia es requerida",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              margin="dense"
              id="suburb"
              label="Colonia"
              type="text"
              size="small"
              fullWidth
              error={!!errors.suburb}
              helperText={!!errors.suburb && errors.suburb.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={2}>
        <Controller
          name="apartmentNumber"
          control={control}
          rules={{
            required: {
              value: false,
              message: "Numero exterior requerido",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              margin="dense"
              id="streetNumber"
              label="Numero exterior"
              type="number"
              size="small"
              error={!!errors.apartmentNumber}
              helperText={
                !!errors.apartmentNumber && errors.apartmentNumber.message
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={10}>
        <Controller
          name="street"
          control={control}
          rules={{
            required: {
              value: false,
              message: "La calle es requerida",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              margin="dense"
              id="street"
              label="Calle"
              type="text"
              size="small"
              fullWidth
              error={!!errors.street}
              helperText={!!errors.street && errors.street.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={2}>
        <Controller
          name="apartmentNumber"
          control={control}
          rules={{
            required: {
              value: false,
              message: "Numero interior requerido",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              margin="dense"
              id="apartmentNumber"
              label="Numero interior"
              type="number"
              size="small"
              error={!!errors.streetNumber}
              helperText={!!errors.streetNumber && errors.streetNumber.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
