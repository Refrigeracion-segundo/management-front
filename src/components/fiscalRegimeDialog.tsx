"use client";
import { Add } from "@mui/icons-material";
import {
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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import {
  Controller,
  useForm,
} from "react-hook-form";
import { IRegimeRegister, IRegimeUpdate } from "@/common";
import {
  closeFiscalRegime,
  openFiscalRegime,
  saveFiscalRegime,
} from "@/redux/slices/fiscalRegime";
import {
  useRegisterRegimeMutation,
  useUpdateRegimeMutation,
} from "@/redux/api/fiscalRegime";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";

export const DialogFiscalRegime = () => {
  const { openDialog, data, isUpdate } = useSelector(
    (store: RootState) => store.fiscalRegime
  );
  const {
    formState: { errors },

    handleSubmit,
    control,
  } = useForm<IRegimeRegister>({ values: data });
  const [registerRegime, { isLoading }] = useRegisterRegimeMutation();
  const [updateRegime, { isLoading: isLoadingUpdate }] =
    useUpdateRegimeMutation();

  useEffect(() => {}, [data]);

  const saveData = async (newData: any) => {
    isUpdate
      ? await updateRegime({
          ...newData,
          _id: (data as IRegimeUpdate)._id,
          key: Number(newData.key),
        }).unwrap()
      : await registerRegime({
          ...newData,
          key: Number(newData.key),
        }).unwrap();
        
    dispatch(closeFiscalRegime());
    enqueueSnackbar("Registrado correctamente", {
      variant: "success",
    });
  };
  const dispatch = useDispatch();
  return (
    <div>
      <IconButton
        onClick={() => {
          dispatch(openFiscalRegime());
        }}
      >
        <Add />
      </IconButton>
      <Dialog open={openDialog} fullWidth>
        <DialogTitle>
          <Typography variant="h6" align="center">
            Formulario del SAT
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            spacing={1}
          >
            <Grid item xs={3}>
              <Controller
                name="key"
                rules={{
                  required: {
                    value: true,
                    message: "La clave es requerida",
                  },
                }}
                control={control}
                defaultValue={data.key}
                render={({ field }) => {
                  return (
                    <TextField
                      autoFocus
                      type="number"
                      fullWidth
                      placeholder="Clave"
                      value={field.value == 0 ? null : field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        if (
                          e.target.value !== "" ||
                          e.target.value !== null ||
                          e.target.value
                        )
                          dispatch(
                            saveFiscalRegime({
                              ...data,
                              key: Number(e.target.value),
                            })
                          );
                      }}
                      helperText={
                        !!errors.description && errors.description.message
                      }
                      error={!!errors.description}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <Controller
                name="description"
                rules={{
                  required: {
                    value: true,
                    message: "La description es requerido",
                  },
                }}
                control={control}
                defaultValue={data.description}
                render={({ field }) => {
                  return (
                    <TextField
                      placeholder="Descripción"
                      fullWidth
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch(
                          saveFiscalRegime({
                            ...data,
                            description: e.target.value,
                          })
                        );
                      }}
                      helperText={
                        !!errors.description && errors.description.message
                      }
                      error={!!errors.description}
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
            onClick={() => dispatch(closeFiscalRegime())}
          >
            Cancelar
          </Button>
          <LoadingButton
            loading={isLoading || isLoadingUpdate}
            loadingPosition="end"
            onClick={handleSubmit(saveData)}
            style={{ width: "20%" }}
          >
            Guardar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
