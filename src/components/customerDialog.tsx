/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Add } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
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

export const DialogCustomer = (props: {
  register: UseFormRegister<IClientRegister>;
  formState: FormState<IClientRegister>;
  clearErrors: UseFormClearErrors<IClientRegister>;
  handleSubmit: UseFormHandleSubmit<IClientRegister>;
  getValues: UseFormGetValues<IClientRegister>;
  reset: UseFormReset<IClientRegister>;
}) => {
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,

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
  const [
    registerCustomer,
    { isLoading: isLoadingCustomer, isSuccess: isSuccessCustomer },
  ] = useRegisterClientMutation();
  const [
    updateCustomer,
    { isLoading: isLoadingUpdateCustomer, isSuccess: isSuccessUpdateCustomer },
  ] = useUpdateClientMutation();
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
      stateId: dataClient.state ? (dataClient.state as ICityState).id : 0,
      name: cityName,
    });
  }, [dataClient.state]);

  const dispatch = useDispatch();

  const handleClickSave = (data: IClientRegister | IClientUpdate) => {
    console.log(data);
    if (isUpdate) {
      updateCustomer({
        ...data,
        fiscalRegime: (dataClient.fiscalRegime as IRegimeResponse)._id,
        _id: (data as IClientUpdate)._id,
      })
        .unwrap()
        .then(() => {
          dispatch(closeClient());
        });
    } else {
      registerCustomer({ ...data, fiscalRegime: dataClient.fiscalRegime })
        .unwrap()
        .then(() => {
          dispatch(closeClient());
        });
      // dispatch(openClient(data));
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
                <TextField
                  autoFocus
                  variant="standard"
                  margin="dense"
                  id="companyName"
                  label="Nombre"
                  type="text"
                  size="small"
                  fullWidth
                  {...register("name", {
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                    maxLength: {
                      value: 80,
                      message: "La maxima longitud es de 80 caracteres.",
                    },
                  })}
                  error={!!errors.name}
                  helperText={!!errors.name && errors.name.message}
                />
              </Grid>
              <Grid item xs={11} container alignItems="center">
                <TextField
                  variant="standard"
                  margin="dense"
                  id="companyName"
                  label="Persona de contacto"
                  type="text"
                  size="small"
                  fullWidth
                  {...register("contactPerson", {
                    required: {
                      value: true,
                      message: "Persona de contacto es requerida",
                    },
                    maxLength: {
                      value: 80,
                      message: "La maxima longitud es de 80 caracteres.",
                    },
                  })}
                  error={!!errors.contactPerson}
                  helperText={
                    !!errors.contactPerson && errors.contactPerson.message
                  }
                />
              </Grid>
              <Grid item xs={11} container alignItems="center">
                <TextField
                  variant="standard"
                  margin="dense"
                  id="companyName"
                  label="Celular"
                  type="tel"
                  size="small"
                  fullWidth
                  {...register("phone", {
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
                  })}
                  error={!!errors.phone}
                  helperText={!!errors.phone && errors.phone.message}
                />
              </Grid>
              <Grid item xs={11}>
                <Autocomplete
                  disablePortal
                  blurOnSelect
                  defaultValue={
                    isUpdate
                      ? (dataClient.fiscalRegime as IRegimeResponse)
                      : ("" as any)
                  }
                  loading={isLoadingRegime}
                  onOpen={() => getRegime()}
                  id="fiscalRegime"
                  options={isSuccessRegime && dataRegime ? dataRegime : []}
                  getOptionLabel={(option: IRegimeResponse) => {
                    return option?.key
                      ? `${option.key} - ${option.description}`
                      : "";
                  }}
                  onChange={(value, newValue) => {
                    if (newValue) {
                      dispatch(
                        saveClient({
                          ...dataClient,
                          fiscalRegime: newValue?._id,
                        })
                      );

                      clearErrors("fiscalRegime");
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
                      {...register("fiscalRegime", { required: true })}
                      error={!!errors.fiscalRegime}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={11}>
                <TextField
                  variant="standard"
                  margin="dense"
                  id="rfc"
                  label="RFC"
                  placeholder="Ejemplo XAXX010101000"
                  type="text"
                  size="small"
                  fullWidth
                  {...register("rfc", {
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
                  })}
                  error={!!errors.rfc}
                  helperText={!!errors.rfc && errors.rfc.message}
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
                <Autocomplete
                  disablePortal
                  defaultValue={
                    isUpdate
                      ? { id: 0, name: dataClient.state as string }
                      : dataClient.state
                      ? (dataClient.state as ICityState)
                      : { id: 0, name: "" }
                  }
                  options={dataState?.items ? dataState.items : []}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option: { id: number; name: string }) =>
                    option.name
                  }
                  onChange={(e, value) => {
                    console.log(value);
                    if (value) {
                      // setStateName(value.name);
                      dispatch(saveClient({ ...dataClient, state: value }));
                      clearErrors("state");
                    }
                  }}
                  sx={{ width: 300, marginTop: "-3px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      margin="dense"
                      label="Estado"
                      sx={{ width: "115%" }}
                      {...register("state", {
                        required: {
                          value: false,
                          message: "Este campo es requerido",
                        },
                      })}
                      onChange={(e) => {
                        setStateName(e.target.value);
                      }}
                      error={!!errors.state}
                      helperText={!!errors.state && errors.state.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  disablePortal
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  defaultValue={
                    isUpdate
                      ? { id: 0, name: dataClient.city as string }
                      : { id: 0, name: "" }
                  }
                  options={dataCities?.items ? dataCities.items : []}
                  getOptionLabel={(option: { id: number; name: string }) =>
                    option.name
                  }
                  onChange={(e, value) => {
                    if (value) {
                      clearErrors("city");
                    }
                  }}
                  sx={{ width: 300, marginTop: "-3px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      margin="dense"
                      label="Ciudad"
                      {...register("city", {
                        required: {
                          value: false,
                          message: "La ciudad es requerida",
                        },
                      })}
                      onChange={(e) => {
                        setCityName(e.target.value);
                      }}
                      error={!!errors.city}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="standard"
                  margin="dense"
                  id="zipCode"
                  label="*Código postal"
                  type="number"
                  size="small"
                  sx={{ width: "128%" }}
                  {...register("zipCode", {
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
                  })}
                  error={!!errors.zipCode}
                  helperText={!!errors.zipCode && errors.zipCode.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  margin="dense"
                  id="suburb"
                  label="Colonia"
                  type="text"
                  size="small"
                  fullWidth
                  {...register("suburb", {
                    required: {
                      value: false,
                      message: "La colonia es requerida",
                    },
                  })}
                  error={!!errors.suburb}
                  helperText={!!errors.suburb && errors.suburb.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  margin="dense"
                  id="street"
                  label="Calle"
                  type="text"
                  size="small"
                  sx={{ width: "118%" }}
                  {...register("street", {
                    required: {
                      value: false,
                      message: "La calle es requerida",
                    },
                  })}
                  error={!!errors.street}
                  helperText={!!errors.street && errors.street.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="standard"
                  margin="dense"
                  id="apartmentNumber"
                  label="Numero interior"
                  type="number"
                  size="small"
                  {...register("apartmentNumber", {
                    required: {
                      value: false,
                      message: "Numero interior requerido",
                    },
                  })}
                  error={!!errors.streetNumber}
                  helperText={
                    !!errors.streetNumber && errors.streetNumber.message
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="standard"
                  margin="dense"
                  id="streetNumber"
                  label="Numero exterior"
                  type="number"
                  size="small"
                  {...register("streetNumber", {
                    required: {
                      value: false,
                      message: "Numero exterior requerido",
                    },
                  })}
                  error={!!errors.apartmentNumber}
                  helperText={
                    !!errors.apartmentNumber && errors.apartmentNumber.message
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => dispatch(closeClient())}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit(handleClickSave)}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
