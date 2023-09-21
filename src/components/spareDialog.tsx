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
import {
  FormState,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { ISpareRegister, ISpareUpdate } from "@/common";
import {
  cleanReduxSpare,
  closeSpare,
  isUpdatingSpare,
  openSpare,
} from "@/redux/slices/dialogSpare";
import { useRegisterSpareMutation, useUpdateSpareMutation } from "@/redux/api";
import { enqueueSnackbar } from "notistack";

export const DialogSpare = (props: {
  register: UseFormRegister<ISpareRegister>;
  formState: FormState<ISpareRegister>;
  clearErrors: UseFormClearErrors<ISpareRegister>;
  handleSubmit: UseFormHandleSubmit<ISpareRegister>;
  getValues: UseFormGetValues<ISpareRegister>;
  reset: UseFormReset<ISpareRegister>;
}) => {
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    getValues,
    reset,
  } = props;
  const {
    openDialog,
    isUpdate,
    spare: dataSpare,
  } = useSelector((store: RootState) => store.dialogSpare);
  const [registerSpare, { isLoading: isLoadingRegister }] =
    useRegisterSpareMutation();
  const [updateSpare, { isLoading: isLoadingUpdate }] =
    useUpdateSpareMutation();

  const dispatch = useDispatch();

  const handleClickSave = async (data: ISpareRegister | ISpareUpdate) => {
    try {
      !isUpdate
        ? await registerSpare(data).unwrap()
        : await updateSpare({
            ...data,
            _id: (dataSpare as ISpareUpdate)._id as string,
          }).unwrap();
      enqueueSnackbar("Se guardo con exito", { variant: "success" });
      dispatch(closeSpare());
      dispatch(cleanReduxSpare());
    } catch {
      enqueueSnackbar("Ups!, intente de nuevo mas tarde", { variant: "error" });
    }
  };
  return (
    <div>
      <IconButton
        onClick={() => {
          reset();
          dispatch(openSpare());
        }}
      >
        <Add />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={() => {
          dispatch(closeSpare());
          dispatch(isUpdatingSpare(false));
        }}
      >
        <DialogTitle>
          <Typography variant="h6" align="center">
            Formulario de Refacciones
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
                placeholder="Descripcion"
                {...register("description", {
                  required: {
                    value: true,
                    message: "La descripcion es requerida",
                  },
                })}
                helperText={!!errors.description && errors.description.message}
                error={!!errors.description}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Precio sugerido"
                {...register("suggestedPrice", {
                  required: {
                    value: true,
                    message: "El precio sugerido es requerido",
                  },
                  min: {
                    value: 0,
                    message: "El precio sugerido debe ser mayor a 0",
                  },
                  max: {
                    value: 1000000000,
                    message: "El precio sugerido debe ser menor a 1000000000",
                  },
                  valueAsNumber: true,
                })}
                type="number"
                helperText={
                  !!errors.suggestedPrice && errors.suggestedPrice.message
                }
                error={!!errors.suggestedPrice}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => dispatch(closeSpare())}>
            Cancelar
          </Button>
          <Button
            disabled={isLoadingRegister || isLoadingUpdate}
            onClick={handleSubmit(handleClickSave)}
            endIcon={
              (isLoadingRegister || isLoadingUpdate) && (
                <CircularProgress size={15} />
              )
            }
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
