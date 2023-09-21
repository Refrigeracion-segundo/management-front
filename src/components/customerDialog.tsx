/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Add } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  Control,
  Controller,
  FormState,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { ICityState, IClientRegister, IClientUpdate } from "@/common";
import { IRegimeResponse } from "@/common/interfaces/regimeResponse";
import {
  cleanReduxClient,
  closeClient,
  isUpdatingClient,
  openClient,
  saveClient,
} from "@/redux/slices/dialogClient";
import { useLazyFindAllFiscalRegimeQuery } from "@/redux/api/fiscalRegime";
import {
  useLazyFindCitiesQuery,
  useLazyFindStateQuery,
} from "@/redux/api/countryState.api";
import {
  useRegisterClientMutation,
  useUpdateClientMutation,
} from "@/redux/api";
import { enqueueSnackbar } from "notistack";

export const DialogCustomer = (props: {
  register: UseFormRegister<IClientRegister>;
  formState: FormState<IClientRegister>;
  clearErrors: UseFormClearErrors<IClientRegister>;
  handleSubmit: UseFormHandleSubmit<IClientRegister>;
  getValues: UseFormGetValues<IClientRegister>;
  reset: UseFormReset<IClientRegister>;
  control: Control<IClientRegister | IClientUpdate, any>;
}) => {
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    control,
    reset,
  } = props;
  const { openDialog, dataClient, isUpdate } = useSelector(
    (store: RootState) => store.dialogClient
  );
  const [
    getRegime,
    {
      isLoading: isLoadingRegime,
      data: dataRegime,
      isSuccess: isSuccessRegime,
    },
  ] = useLazyFindAllFiscalRegimeQuery();
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
    {
      isLoading: isLoadingCountry,
      data: dataState,
      isSuccess: isSuccessCountry,
    },
  ] = useLazyFindStateQuery();
  const [registerCustomer, { isLoading: isLoadingRegisterCustomer }] =
    useRegisterClientMutation();
  const [updateCustomer, { isLoading: isLoadingUpdateCustomer }] =
    useUpdateClientMutation();
  const debounceTime = 500;
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

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
      stateId: dataClient.stateId as number,
      name: cityName,
    });
  }, [dataClient.state]);

  const dispatch = useDispatch();

  const handleClickSave = async (data: IClientRegister | IClientUpdate) => {
    console.log(data);
    try {
      if (isUpdate) {
        await updateCustomer({
          ...dataClient,
          fiscalRegime: (dataClient.fiscalRegime as IRegimeResponse)._id,
          _id: (data as IClientUpdate)._id,
        });
      } else {
        await registerCustomer({
          ...dataClient,
          fiscalRegime: (dataClient.fiscalRegime as IRegimeResponse)._id,
        });
      }
      dispatch(cleanReduxClient());
      dispatch(closeClient());
      enqueueSnackbar("Cliente registrado", { variant: "success" });
    } catch {
      enqueueSnackbar("Intente de nuevo mas tarde", { variant: "error" });
    }
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          reset();
          dispatch(openClient());
        }}
      >
        <Add />
      </IconButton>
      <Dialog
        disableEscapeKeyDown={true}
        open={openDialog}
        onClose={() => {
          dispatch(closeClient());
          dispatch(isUpdatingClient(false));
        }}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" align="center">
            Formulario de clientes
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            direction="row"
            xs={12}
            justifyContent="center"
            sx={{ mt: "2%" }}
          >
            <Grid item container spacing={2} direction="row" xs={5}>
              <Grid item xs={11} container alignItems="center">
                <Controller
                  name="name"
                  rules={{
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                    maxLength: {
                      value: 80,
                      message: "La maxima longitud es de 80 caracteres.",
                    },
                  }}
                  control={control}
                  defaultValue={dataClient.name}
                  render={({ field }) => {
                    return (
                      <TextField
                        autoFocus
                        variant="standard"
                        margin="dense"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          dispatch(
                            saveClient({ ...dataClient, name: e.target.value })
                          );
                        }}
                        label="Nombre"
                        type="text"
                        size="small"
                        fullWidth
                        error={!!errors.name}
                        helperText={!!errors.name && errors.name.message}
                      />
                    );
                  }}
                />
              </Grid>

              <Grid item xs={11} container alignItems="center">
                <Controller
                  control={control}
                  name="contactPerson"
                  rules={{
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                    maxLength: {
                      value: 80,
                      message: "La maxima longitud es de 80 caracteres.",
                    },
                  }}
                  defaultValue={dataClient.contactPerson}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="standard"
                        margin="dense"
                        label="Persona de contacto"
                        type="text"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          dispatch(
                            saveClient({
                              ...dataClient,
                              contactPerson: e.target.value,
                            })
                          );
                        }}
                        error={!!errors.contactPerson}
                        helperText={
                          !!errors.contactPerson && errors.contactPerson.message
                        }
                      />
                    );
                  }}
                />
              </Grid>

              <Grid item xs={11} container alignItems="center">
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: {
                      value: true,
                      message: "El telefono es requerido",
                    },
                    maxLength: {
                      value: 10,
                      message: "Numero invalido",
                    },
                    minLength: {
                      value: 10,
                      message: "Numero invalido",
                    },
                  }}
                  defaultValue={dataClient.phone}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="standard"
                        margin="dense"
                        id="companyName"
                        label="Celular"
                        type="tel"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          dispatch(
                            saveClient({
                              ...dataClient,
                              phone: e.target.value,
                            })
                          );
                        }}
                        error={!!errors.phone}
                        helperText={!!errors.phone && errors.phone.message}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={11}>
                <Controller
                  control={control}
                  name="fiscalRegime"
                  rules={{
                    required: {
                      value: true,
                      message: "Su regimen fiscal es requerido",
                    },
                  }}
                  defaultValue={dataClient.fiscalRegime as IRegimeResponse}
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        disablePortal
                        blurOnSelect
                        value={field.value as IRegimeResponse}
                        loading={isLoadingRegime}
                        onOpen={() => getRegime()}
                        id="fiscalRegime"
                        options={
                          isSuccessRegime && dataRegime ? dataRegime : []
                        }
                        getOptionLabel={(option: IRegimeResponse) => {
                          return option?.key
                            ? `${option.key} - ${option.description}`
                            : "";
                        }}
                        onChange={(value, newValue) => {
                          if (newValue) {
                            field.onChange(newValue);
                            dispatch(
                              saveClient({
                                ...dataClient,
                                fiscalRegime: newValue,
                              })
                            );

                            // clearErrors("fiscalRegime");
                          }
                        }}
                        fullWidth
                        // sx={{ width: 300, marginTop: "-3px" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            margin="dense"
                            label="*Regimen fiscal"
                            fullWidth
                            error={!!errors.fiscalRegime}
                            helperText={
                              !!errors.fiscalRegime &&
                              errors.fiscalRegime.message
                            }
                          />
                        )}
                      />
                    );
                  }}
                />
              </Grid>

              <Grid item xs={11}>
                <Controller
                  control={control}
                  name="rfc"
                  rules={{
                    required: {
                      value: true,
                      message: "El rfc es requerido",
                    },
                    minLength: {
                      value: 12,
                      message: "La minima longitud es de 12 caracteres.",
                    },
                    maxLength: {
                      value: 13,
                      message: "La maxima longitud es de 13 caracteres.",
                    },
                  }}
                  defaultValue={dataClient.rfc}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="standard"
                        margin="dense"
                        id="rfc"
                        label="RFC"
                        placeholder="Ejemplo XAXX010101000"
                        type="text"
                        size="small"
                        fullWidth
                        value={field.value}
                        error={!!errors.rfc}
                        onChange={(e) => {
                          field.onChange(e);
                          dispatch(
                            saveClient({ ...dataClient, rfc: e.target.value })
                          );
                        }}
                        helperText={!!errors.rfc && errors.rfc.message}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>

            <Divider orientation="vertical" variant="fullWidth" flexItem />

            <Grid item container spacing={2} direction="row" xs={5}>
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
              <Grid item xs={8}>
                <Controller
                  name="state"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  defaultValue={{
                    id: dataClient.stateId as number,
                    name: dataClient.state as string,
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      value={field.value}
                      // loading={isLoadingState}
                      options={dataState?.items ? dataState.items : ([] as any)}
                      onChange={(_, newValue) => {
                        field.onChange(newValue);
                        dispatch(
                          saveClient({
                            ...dataClient,
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
              <Grid item xs={8}>
                <Controller
                  name="city"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  defaultValue={{
                    id: dataClient.cityId as number,
                    name: dataClient.city as string,
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      value={field.value}
                      loading={isLoadingCities}
                      options={dataCities?.items ? dataCities.items : []}
                      onChange={(_, newValue) => {
                        field.onChange(newValue);
                        dispatch(
                          saveClient({
                            ...dataClient,
                            city: (newValue as ICityState).name,
                            cityId: (newValue as ICityState).id,
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
                  control={control}
                  name="zipCode"
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
                  defaultValue={dataClient.zipCode}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="standard"
                        margin="dense"
                        id="zipCode"
                        label="*Código postal"
                        type="number"
                        size="small"
                        sx={{ width: "128%" }}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          dispatch(
                            saveClient({
                              ...dataClient,
                              zipCode: e.target.value,
                            })
                          );
                        }}
                        error={!!errors.zipCode}
                        helperText={!!errors.zipCode && errors.zipCode.message}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="suburb"
                  rules={{
                    required: {
                      value: false,
                      message: "La colonia es requerida",
                    },
                  }}
                  defaultValue={dataClient.suburb}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="standard"
                        margin="dense"
                        id="suburb"
                        label="Colonia"
                        type="text"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          dispatch(
                            saveClient({
                              ...dataClient,
                              suburb: e.target.value,
                            })
                          );
                        }}
                        error={!!errors.suburb}
                        helperText={!!errors.suburb && errors.suburb.message}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="street"
                  rules={{
                    required: {
                      value: true,
                      message: "La calle es requerida",
                    },
                  }}
                  defaultValue={dataClient.street}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="standard"
                        margin="dense"
                        id="street"
                        label="Calle"
                        type="text"
                        size="small"
                        sx={{ width: "118%" }}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          dispatch(
                            saveClient({
                              ...dataClient,
                              street: e.target.value,
                            })
                          );
                        }}
                        error={!!errors.street}
                        helperText={!!errors.street && errors.street.message}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  control={control}
                  name="apartmentNumber"
                  rules={{
                    required: {
                      value: false,
                      message: "Numero interior requerido",
                    },
                  }}
                  defaultValue={dataClient.apartmentNumber}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="standard"
                        margin="dense"
                        id="apartmentNumber"
                        label="Numero interior"
                        type="number"
                        size="small"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          dispatch(
                            saveClient({
                              ...dataClient,
                              apartmentNumber: e.target.value,
                            })
                          );
                        }}
                        error={!!errors.apartmentNumber}
                        helperText={
                          !!errors.apartmentNumber &&
                          errors.apartmentNumber.message
                        }
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  control={control}
                  name="streetNumber"
                  rules={{
                    required: {
                      value: false,
                      message: "Numero exterior requerido",
                    },
                  }}
                  defaultValue={dataClient.streetNumber}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="standard"
                        margin="dense"
                        id="streetNumber"
                        label="Numero exterior"
                        type="number"
                        size="small"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          dispatch(
                            saveClient({
                              ...dataClient,
                              streetNumber: e.target.value,
                            })
                          );
                        }}
                        error={!!errors.streetNumber}
                        helperText={
                          !!errors.streetNumber && errors.streetNumber.message
                        }
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            disabled={isLoadingUpdateCustomer || isLoadingRegisterCustomer}
            endIcon={
              (isLoadingUpdateCustomer || isLoadingRegisterCustomer) && (
                <CircularProgress size={15} />
              )
            }
            onClick={() => dispatch(closeClient())}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit(handleClickSave)}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
