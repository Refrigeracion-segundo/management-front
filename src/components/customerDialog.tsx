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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { open, close, isUpdatingUser } from "../redux/slices/dialogUser";
import {
  FormState,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { IClientRegister, ROLES } from "@/common";
import { IRegimeResponse } from "@/common/interfaces/regimeResponse";
import {
  closeClient,
  isUpdatingClient,
  openClient,
} from "@/redux/slices/dialogClient";

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
    getValues,
    reset,
  } = props;
  const { openDialog } = useSelector((store: RootState) => store.dialogClient);

  const dispatch = useDispatch();
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
            Formulario de usuarios
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
              <Grid item xs={11}>
                <Autocomplete
                  disablePortal
                  blurOnSelect
                  loading
                  id="fiscalRegime"
                  options={[]}
                  getOptionLabel={(option: IRegimeResponse) =>
                    `${option.code} - ${option.name}`
                  }
                  onChange={(value, newValue) => {
                    clearErrors("fiscalRegime");
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
                  options={[]}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option: { id: number; name: string }) =>
                    option.name
                  }
                  onChange={(e, value) => {
                    if (value) {
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
                  options={[]}
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
          <Button color="secondary" onClick={() => dispatch(close())}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit((data) => console.log(data))}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
