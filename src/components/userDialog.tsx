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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  open,
  close,
  cleanReduxUser,
} from "../redux/slices/dialogUser";
import {
  FormState,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { IUserRegister, IUserUpdate, ROLES, RoleTranslate } from "@/common";
// import { useRegisterUserMutation, useUpdateUserMutation } from "@/redux/api";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";
import {
  useRegisterUserMutation,
  useUpdateUserMutation,
} from "@/redux/api/user.api";

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
  const [rol, setRole] = useState("");

  const createUser = async (data: IUserRegister) => {
    try {
      if (!isUpdate) {
        await registerUser({ ...data, roles: [rol] } as any).unwrap();
      } else {
        await updateUser({
          ...data,
          _id: (user as IUserUpdate)._id as string,
          roles: [rol],
        }).unwrap();
      }

      dispatch(close());
      dispatch(cleanReduxUser());
      enqueueSnackbar("Registrado correctamente", { variant: "success" });
    } catch {
      // enqueueSnackbar("Intente de nuevo mas tarde", { variant: "error" });
    }
  };

  useEffect(() => {
    isUpdate && setRole(user.roles[0]);
  }, [isUpdate]);

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
      <Dialog open={openDialog} maxWidth="sm" fullWidth={!isUpdate}>
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
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El email es requerido",
                  },
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Email invalido"
                  }
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
                defaultValue={
                  isUpdate
                    ? RoleTranslate.get(user.roles[0] as any as string)
                    : RoleTranslate.get(ROLES.USER)
                }
                disablePortal
                // multiple
                options={Array.from(RoleTranslate.values())}
                onChange={(value, newValue) => {
                  clearErrors("roles");
                  newValue && setRole(newValue?.key);
                }}
                getOptionLabel={(option) => option.translate}
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
