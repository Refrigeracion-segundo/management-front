"use client";

import { Add } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  UseFormSetValue,
} from "react-hook-form";
import { IUserRegister, ROLES } from "@/common";

/*
formState: FormState<InvoiceData>
  register: UseFormRegister<InvoiceData>
  clearErrors: UseFormClearErrors<InvoiceData>
  setError?: UseFormSetError<InvoiceData>
*/

export const DialogUser = (props: {
  register: UseFormRegister<IUserRegister>;
  formState: FormState<IUserRegister>;
  clearErrors: UseFormClearErrors<IUserRegister>;
  handleSubmit: UseFormHandleSubmit<IUserRegister>;
  getValues: UseFormGetValues<IUserRegister>;
  reset: UseFormReset<IUserRegister>;
}) => {
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    getValues,
    reset,
  } = props;
  const { openDialog, isUpdate } = useSelector(
    (store: RootState) => store.dialogUser
  );

  const dispatch = useDispatch();
  return (
    <div>
      <IconButton
        onClick={() => {
          reset();
          dispatch(open());
        }}
      >
        <Add />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={() => {
          dispatch(close());
          dispatch(isUpdatingUser(false));
        }}
      >
        <DialogTitle>
          <Typography variant="h6" align="center">
            Formulario de usuarios
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            direction="column"
            gap={2}
          >
            <Grid item xs={6}>
              <TextField
                autoFocus
                placeholder="Nombre"
                {...register("name", {
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },
                })}
                helperText={!!errors.name && errors.name.message}
                error={!!errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Apellido"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "El apellido es requerido",
                  },
                })}
                helperText={!!errors.lastName && errors.lastName.message}
                error={!!errors.lastName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Correo electrónico"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El email es requerido",
                  },
                })}
                helperText={!!errors.email && errors.email.message}
                error={!!errors.email}
              />
            </Grid>
            {!isUpdate && (
              <Grid item xs={6}>
                <TextField
                  type="password"
                  placeholder="Contraseña"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Contraseña requerida",
                    },
                    minLength: {
                      value: 5,
                      message: "Contraseña muy corta",
                    },
                    maxLength: {
                      value: 16,
                      message: "Contraseña muy corta",
                    },
                  })}
                  helperText={!!errors.password && errors.password.message}
                  error={!!errors.password}
                />
              </Grid>
            )}

            <Grid item xs={6}>
              <Autocomplete
                defaultValue={getValues("rol")}
                disablePortal
                // multiple
                options={Object.values(ROLES)}
                onChange={(value, newValue) => {
                  clearErrors("rol");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Rol "
                    {...register("rol", {
                      required: {
                        value: true,
                        message: "Seleccione un rol valido",
                      },
                    })}
                    helperText={!!errors.rol && errors.rol.message}
                    error={!!errors.rol}
                  />
                )}
              />
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
