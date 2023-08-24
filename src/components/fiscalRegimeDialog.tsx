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
import { IRegimeRegister } from "@/common";
import {
  closeFiscalRegime,
  openFiscalRegime,
} from "@/redux/slices/fiscalRegime";

export const DialogFiscalRegime = (props: {
  register: UseFormRegister<IRegimeRegister>;
  formState: FormState<IRegimeRegister>;
  handleSubmit: UseFormHandleSubmit<IRegimeRegister>;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = props;
  const { openDialog, data, isUpdate } = useSelector(
    (store: RootState) => store.fiscalRegime
  );

  useEffect(() => {}, [isUpdate]);

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
      <Dialog
        open={openDialog}
        onClose={() => {
          dispatch(closeFiscalRegime());
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
                placeholder="Clave"
                {...register("key", {
                  required: {
                    value: true,
                    message: "La clave es requerida",
                  },
                })}
                helperText={!!errors.description && errors.description.message}
                error={!!errors.description}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Descripcion"
                {...register("description", {
                  required: {
                    value: true,
                    message: "La description es requerido",
                  },
                })}
                helperText={!!errors.description && errors.description.message}
                error={!!errors.description}
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
          <Button onClick={handleSubmit((data) => console.log(data))}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
