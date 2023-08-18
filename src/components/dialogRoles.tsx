"use client";
import { open, close } from "@/app/redux/slices/dialogUser";
import { RootState } from "@/app/redux/store";

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

export const DialogRoles = () => {
  const openDialog = useSelector(
    (store: RootState) => store.dialogUser.openDialog
  );
  const dispatch = useDispatch();
  return (
    <div>
      <IconButton onClick={() => dispatch(open())}>
        <Add />
      </IconButton>
      <Dialog open={openDialog}>
        <DialogTitle>
          <Typography align="center">Usuarios</Typography>
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
              <TextField autoFocus placeholder="Nombre" />
            </Grid>
            <Grid item xs={6}>
              <TextField autoFocus placeholder="Descripción" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => dispatch(close())}>
            Cancelar
          </Button>
          <Button>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
