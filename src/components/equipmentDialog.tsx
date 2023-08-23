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
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { IEquipmentRegister } from "@/common";
import {
  clearEquipment,
  closeEquipment,
  isUpdatingEquipment,
  openEquipment,
  saveEquipment,
} from "@/redux/slices/dialogEquipment";

export const DialogEquipment = (props: {
  register: UseFormRegister<IEquipmentRegister>;
  formState: FormState<IEquipmentRegister>;
  handleSubmit: UseFormHandleSubmit<IEquipmentRegister>;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = props;
  const { openDialog, data, isUpdate } = useSelector(
    (store: RootState) => store.equipment
  );

  useEffect(() => {}, [isUpdate]);

  const dispatch = useDispatch();
  return (
    <div>
      <IconButton
        onClick={() => {
          dispatch(openEquipment());
        }}
      >
        <Add />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={() => {
          dispatch(closeEquipment());
        }}
      >
        <DialogTitle>
          <Typography variant="h6" align="center">
            Formulario de Repuestos
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => dispatch(closeEquipment())}>
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
