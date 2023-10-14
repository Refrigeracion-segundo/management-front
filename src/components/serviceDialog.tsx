"use client";
import { Add } from "@mui/icons-material";
import {
  Autocomplete,
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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Controller, useForm } from "react-hook-form";
import { IServiceRegister, IEquipmentResponse, IServiceUpdate } from "@/common";
import {
  clearService,
  closeService,
  openService,
  saveService,
} from "@/redux/slices/service";
import { useLazyFindAllEquipmentQuery } from "@/redux/api/equipment.api";
import {
  useRegisterServiceMutation,
  useUpdateServiceMutation,
} from "@/redux/api/services.api";
import {
  APPLICACTION_TYPE,
  ApplicationTypeTranslate,
} from "@/common/constants/equipmentApplication";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";

export const DialogService = () => {
  const {
    openDialog,
    isUpdate,
    data: dataService,
  } = useSelector((store: RootState) => store.service);
  const [selectEquipmentType, setSelectEquipmentType] = useState<string>();
  const {
    formState: { errors },
    register,
    handleSubmit,
    clearErrors,
    reset,
    control,
  } = useForm<IServiceRegister>({ values: dataService });
  const [
    registerService,
    { isSuccess: isSuccessRegister, isLoading: isLoadingRegister },
  ] = useRegisterServiceMutation();
  const [
    updateService,
    { isSuccess: isSuccessUpdate, isLoading: isLoadingUpdate },
  ] = useUpdateServiceMutation();

  const dispatch = useDispatch();
  return (
    <div>
      <IconButton
        onClick={() => {
          dispatch(openService());
        }}
      >
        <Add />
      </IconButton>
      <Dialog open={openDialog} fullWidth>
        <DialogTitle>
          <Typography variant="h6" align="center">
            Formulario tipo de servicios
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            direction="row"
            spacing={1}
          >
            <Grid item xs={9}>
              <Controller
                name="description"
                control={control}
                defaultValue={dataService.description}
                rules={{
                  required: {
                    value: true,
                    message: "La descripción es requerida",
                  },
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      autoFocus
                      type="text"
                      fullWidth
                      placeholder="Descripcion"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch(
                          saveService({
                            ...dataService,
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
          <Button color="secondary" onClick={() => dispatch(closeService())}>
            Cancelar
          </Button>
          <LoadingButton
            loading={isLoadingRegister || isLoadingUpdate}
            loadingPosition="end"
            onClick={handleSubmit(async (newData) => {
              try {
                isUpdate
                  ? await updateService({
                      ...newData,
                      _id: (dataService as IServiceUpdate)._id,
                    }).unwrap()
                  : await registerService({
                      ...newData,
                    }).unwrap();

                dispatch(clearService());
                dispatch(closeService());

                enqueueSnackbar("Registrado correctamente", {
                  variant: "success",
                });
              } catch {}
            })}
            style={{ width: "20%" }}
          >
            Guardar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
