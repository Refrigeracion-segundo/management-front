"use client";

import { Add, Save } from "@mui/icons-material";
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
import { IUserRegister, IUserUpdate, ROLES } from "@/common";
import { useRegisterUserMutation, useUpdateUserMutation } from "@/redux/api";
import { LoadingButton } from "@mui/lab";

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
  const { openDialog, isUpdate, user } = useSelector(
    (store: RootState) => store.dialogUser
  );
  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();
  const [
    updateUser,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateUserMutation();
  const createUser = async (data: IUserRegister) => {
    if (!isUpdate) {
      registerUser({ ...data, roles: [data.roles] } as any);
    } else {
      updateUser({ id: (user as IUserUpdate)._id as string, ...data });
      dispatch(close());
    }

    (isSuccess || isSuccessUpdate) && dispatch(close());
  };
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
        maxWidth="sm"
        fullWidth={!isUpdate}
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
            direction={isUpdate ? "column" : "row"}
            gap={2}
            style={{ marginTop: "2%" }}
          >
            <Grid item xs={5}>
              <TextField
                autoFocus
                label="Nombre del usuario"
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
            <Grid item xs={5}>
              <TextField
                placeholder="Apellido"
                label="Apellido del usuario"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "El apellido es requerido 2",
                  },
                })}
                helperText={!!errors.lastName && errors.lastName.message}
                error={!!errors.lastName}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                placeholder="Correo electrónico"
                label="Correo electronico"
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
              <Grid item xs={5}>
                <TextField
                  type="password"
                  label="Contraseña"
                  placeholder="Contraseña"
                  {...register("password", {
                    required: {
                      value: false,
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
                defaultValue={isUpdate ? (user.roles[0] as string) : ""}
                disablePortal
                // multiple
                options={Object.values(ROLES)}
                onChange={(value, newValue) => {
                  clearErrors("roles");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Roles "
                    {...register("roles", {
                      required: {
                        value: true,
                        message: "Seleccione un rol valido",
                      },
                    })}
                    helperText={!!errors.roles && errors.roles.message}
                    error={!!errors.roles}
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
          <LoadingButton
            loading={isLoading || isLoadingUpdate}
            loadingPosition="end"
            onClick={handleSubmit(createUser)}
            style={{ width: "20%" }}
          >
            Guardar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
