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
  useForm,
} from "react-hook-form";
import { IEquipmentRegister, IEquipmentUpdate } from "@/common";
import {
  clearEquipment,
  closeEquipment,
  openEquipment,
  saveEquipment,
} from "@/redux/slices/dialogEquipment";
import {
  useRegisterEquipmentMutation,
  useUpdateEquipmentMutation,
} from "@/redux/api/equipment.api";
import { enqueueSnackbar } from "notistack";

export const DialogEquipment = () => {
  const { data: dataEquipment } = useSelector(
    (store: RootState) => store.equipment
  );
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IEquipmentRegister>({
    defaultValues: { name: "" },
    values: dataEquipment,
  });
  const { openDialog, isUpdate } = useSelector(
    (store: RootState) => store.equipment
  );
  const [registerEquipment, { isLoading: isLoadingRegister }] =
    useRegisterEquipmentMutation();
  const [updateEquipment, { isLoading: isLoadingUpdate }] =
    useUpdateEquipmentMutation();

  const dispatch = useDispatch();

  const handleClickSave = async (
    data: IEquipmentRegister | IEquipmentUpdate
  ) => {
    try {
      !isUpdate
        ? await registerEquipment(data).unwrap()
        : await updateEquipment({
            ...data,
            id: (data as IEquipmentUpdate)._id as string,
          }).unwrap();
      dispatch(clearEquipment());
      enqueueSnackbar("Se guardo con éxito", { variant: "success" });
      dispatch(closeEquipment());
    } catch {
      // enqueueSnackbar("Ups!, intente de nuevo mas tarde", { variant: "error" });
    }
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          dispatch(openEquipment());
        }}
      >
        <Add />
      </IconButton>
      <Dialog open={openDialog}>
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
                placeholder="Nombre"
                {...register("name", {
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },
                })}
                onChange={(e) => {
                  dispatch(
                    saveEquipment({ ...dataEquipment, name: e.target.value })
                  );
                }}
                helperText={!!errors.name && errors.name.message}
                error={!!errors.name}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => dispatch(closeEquipment())}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit(handleClickSave)}
            disabled={isLoadingRegister || isLoadingUpdate}
            endIcon={isLoadingRegister && <CircularProgress size={15} />}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
