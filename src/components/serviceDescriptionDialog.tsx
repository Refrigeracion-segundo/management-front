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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import {
  FormState,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import {
  IServiceDescriptionRegister,
  IServiceDescriptionUpdate,
  IServiceResponse,
} from "@/common";

import { LoadingButton } from "@mui/lab";
import {
  useRegisterServiceDescriptionMutation,
  useUpdateServiceDescriptionMutation,
} from "@/redux/api/serviceDescription.api";
import {
  closeServiceDescription,
  openServiceDescription,
  saveServiceDescription,
} from "@/redux/slices/serviceDescription";
import { useLazyFindAllServiceQuery } from "@/redux/api/services.api";

export const DialogServiceDescription = (props: {
  register: UseFormRegister<IServiceDescriptionRegister>;
  formState: FormState<IServiceDescriptionRegister>;
  handleSubmit: UseFormHandleSubmit<IServiceDescriptionRegister>;
  clearErrors: UseFormClearErrors<IServiceDescriptionRegister>;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = props;
  const { openDialog, data, isUpdate } = useSelector(
    (store: RootState) => store.serviceDescription
  );
  const [registerServiceDescription, { isLoading }] =
    useRegisterServiceDescriptionMutation();
  const [updateServiceDescription, { isLoading: isLoadingUpdate }] =
    useUpdateServiceDescriptionMutation();
  const [
    getServices,
    {
      isLoading: isLoadingService,
      isSuccess: IsSuccessService,
      data: dataServices,
    },
  ] = useLazyFindAllServiceQuery();

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
      <Dialog
        open={openDialog}
        onClose={() => {
          dispatch(closeServiceDescription());
        }}
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" align="center">
            Formulario del servicios
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            direction="column"
            spacing={1}
          >
            <Grid item xs={6}>
              <TextField
                autoFocus
                type="text"
                fullWidth
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
              <Autocomplete
                disablePortal
                blurOnSelect
                defaultValue={
                  isUpdate ? (data.service as IServiceResponse) : ("" as any)
                }
                loading={isLoadingService}
                onOpen={() => getServices()}
                id="serviceDescription"
                options={IsSuccessService && dataServices ? dataServices : []}
                getOptionLabel={(option: IServiceResponse) => {
                  return option?.name ? `${option.name}` : "";
                }}
                onChange={(value, newValue) => {
                  if (newValue) {
                    console.log(isUpdate);
                    dispatch(
                      saveServiceDescription({
                        ...data,
                        service: newValue._id,
                      })
                    );

                    clearErrors("service");
                  }
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    margin="dense"
                    label="Servicio"
                    fullWidth
                    {...register("service", {
                      required: {
                        value: true,
                        message: "El servicio es requerido",
                      },
                    })}
                    error={!!errors.service}
                    helperText={!!errors.service && errors.service.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => dispatch(closeServiceDescription())}
          >
            Cancelar
          </Button>
          <LoadingButton
            loading={isLoading || isLoadingUpdate}
            loadingPosition="end"
            onClick={handleSubmit((newData) => {
              isUpdate
                ? updateServiceDescription({
                    ...newData,
                    _id: (data as IServiceDescriptionUpdate)._id,
                    service: (data.service as IServiceResponse)._id,
                  })
                : registerServiceDescription({
                    ...newData,
                    service: (data.service as IServiceResponse)._id,
                  });
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
