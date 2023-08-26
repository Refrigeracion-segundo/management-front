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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import {
  FormState,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import {
  IServiceRegister,
  IEquipmentUpdate,
  IEquipmentResponse,
} from "@/common";
import { closeService, openService } from "@/redux/slices/service";
import {
  useLazyFindAllEquipmentQuery,
  useRegisterEquipmentMutation,
  useUpdateEquipmentMutation,
} from "@/redux/api/equipment.api";

export const DialogService = (props: {
  register: UseFormRegister<IServiceRegister>;
  formState: FormState<IServiceRegister>;
  handleSubmit: UseFormHandleSubmit<IServiceRegister>;
  clearErrors: UseFormClearErrors<IServiceRegister>;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = props;
  const {
    openDialog,
    isUpdate,
    data: dataService,
  } = useSelector((store: RootState) => store.service);
  const [
    getEquipment,
    {
      data: dataEquipment,
      isLoading: isLoadingEquipment,
      isSuccess: isSuccessEquipment,
      isFetching: isFetchingEquipment,
    },
  ] = useLazyFindAllEquipmentQuery();
  // const [registerEquipment, { isSuccess: isSuccessRegister }] =
  //   useRegisterEquipmentMutation();
  // const [updateEquipment, { isSuccess: isSuccessUpdate }] =
  //   useUpdateEquipmentMutation();

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
      <Dialog
        open={openDialog}
        onClose={() => {
          dispatch(closeService());
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h6" align="center">
            Formulario de Servicios
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            direction="row"
            gap={2}
          >
            <Grid item xs={5}>
              <TextField
                autoFocus
                fullWidth
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
              <Autocomplete
                defaultValue={
                  isUpdate
                    ? dataService.equipmentType
                    : dataService.equipmentType
                }
                disablePortal
                loading={isLoadingEquipment}
                onOpen={() => getEquipment()}
                // multiple
                options={
                  isSuccessEquipment
                    ? (dataEquipment as unknown as Array<IEquipmentResponse>)
                    : []
                }
                onChange={(value, newValue) => {
                  clearErrors("equipmentType");
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Roles "
                    {...register("equipmentType", {
                      required: {
                        value: true,
                        message: "Seleccione un rol valido",
                      },
                    })}
                    helperText={
                      !!errors.equipmentType && errors.equipmentType.message
                    }
                    error={!!errors.equipmentType}
                  />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                autoFocus
                fullWidth
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
                autoFocus
                fullWidth
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
          <Button color="secondary" onClick={() => dispatch(closeService())}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit((data) => {
              // !isUpdate
              //   ? registerEquipment(data)
              //   : updateEquipment({
              //       ...data,
              //       id: (data as IEquipmentUpdate)._id as string,
              //     });
              // (isSuccessRegister || isSuccessUpdate) &&
              //   dispatch(closeService());
            })}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
