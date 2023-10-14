"use client";
import { Add } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
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
import { Controller, useForm } from "react-hook-form";
import {
  IServiceDescriptionRegister,
  IServiceDescriptionResponse,
} from "@/common";
import { LoadingButton } from "@mui/lab";
import {
  useRegisterServiceDescriptionMutation,
  useUpdateServiceDescriptionMutation,
} from "@/redux/api/serviceDescription.api";
import {
  clearServiceDescription,
  closeServiceDescription,
  openServiceDescription,
  saveServiceDescription,
} from "@/redux/slices/serviceDescription";

import { enqueueSnackbar } from "notistack";

export const DialogServiceDescription = () => {
  const { openDialog, data, isUpdate } = useSelector(
    (store: RootState) => store.serviceDescription
  );
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IServiceDescriptionRegister>({
    values: data,
  });

  const [registerServiceDescription, { isLoading }] =
    useRegisterServiceDescriptionMutation();
  const [updateServiceDescription, { isLoading: isLoadingUpdate }] =
    useUpdateServiceDescriptionMutation();

  const dispatch = useDispatch();
  return (
    <div>
      <IconButton
        onClick={() => {
          dispatch(openServiceDescription());
        }}
      >
        <Add />
      </IconButton>
      <Dialog open={openDialog} fullWidth maxWidth="md">
        <DialogTitle>
          <div
            style={{
              display: "flex",
              alignItems: "center",

              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6" textAlign="center">
              Formulario descripción de servicios
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            direction="row"
            spacing={2}
            sx={{ marginTop: 1 }}
          >
            <Grid item xs={10}>
              <Controller
                rules={{
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },
                }}
                name="name"
                defaultValue={data.name}
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      fullWidth
                      placeholder="Nombre"
                      label="Nombre"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.target.value)
                          dispatch(
                            saveServiceDescription({
                              ...data,
                              name: e.target.value,
                            })
                          );
                      }}
                      helperText={!!errors.name && errors.name.message}
                      error={!!errors.name}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Controller
                rules={{
                  required: {
                    value: true,
                    message: "El precio sugerido es requerido",
                  },
                  min: {
                    value: 0,
                    message: "El precio tiene que ser mayor a 0",
                  },
                }}
                name="suggestedPrice"
                defaultValue={
                  data.suggestedPrice == 0 ? ("" as any) : data.suggestedPrice
                }
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      fullWidth
                      defaultValue={null}
                      type="number"
                      placeholder="Precio sugerido"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.target.value)
                          dispatch(
                            saveServiceDescription({
                              ...data,
                              suggestedPrice: parseFloat(e.target.value),
                            })
                          );
                      }}
                      helperText={
                        !!errors.suggestedPrice && errors.suggestedPrice.message
                      }
                      error={!!errors.suggestedPrice}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              dispatch(closeServiceDescription());
            }}
          >
            Cancelar
          </Button>
          <Button
            disabled={isLoading || isLoadingUpdate}
            endIcon={
              (isLoading || isLoadingUpdate) && <CircularProgress size={15} />
            }
            onClick={handleSubmit(async (data) => {
              try {
                !isUpdate
                  ? await registerServiceDescription({
                      ...data,
                    }).unwrap()
                  : await updateServiceDescription({
                      ...data,
                      _id: (data as IServiceDescriptionResponse)._id as string,
                    }).unwrap();

                dispatch(clearServiceDescription());
                dispatch(closeServiceDescription());

                enqueueSnackbar("Registrado correctamente", {
                  variant: "success",
                });
              } catch {}
            })}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
