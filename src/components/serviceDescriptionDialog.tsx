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
  Control,
  Controller,
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
  clearServiceDescription,
  closeServiceDescription,
  openServiceDescription,
  saveServiceDescription,
} from "@/redux/slices/serviceDescription";
import { useLazyFindAllServiceQuery } from "@/redux/api/services.api";
import { enqueueSnackbar } from "notistack";

export const DialogServiceDescription = (props: {
  register: UseFormRegister<IServiceDescriptionRegister>;
  formState: FormState<IServiceDescriptionRegister>;
  handleSubmit: UseFormHandleSubmit<IServiceDescriptionRegister>;
  clearErrors: UseFormClearErrors<IServiceDescriptionRegister>;
  control: Control<IServiceDescriptionRegister, any>;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    control,
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
      <Dialog open={openDialog} fullWidth>
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
            direction="row"
            spacing={1}
          >
            <Grid item xs={9}>
              <Controller
                name="description"
                control={control}
                defaultValue={data.description}
                rules={{
                  required: {
                    value: true,
                    message: "La descripcion es requerida",
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
                          saveServiceDescription({
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
            <Grid item xs={9}>
              <Controller
                name="service"
                rules={{
                  required: {
                    value: true,
                    message: "Seleccione un servicio valido",
                  },
                }}
                defaultValue={data.service as IServiceResponse}
                control={control}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      disablePortal
                      blurOnSelect
                      value={field.value as IServiceResponse}
                      loading={isLoadingService}
                      onOpen={() => getServices()}
                      id="serviceDescription"
                      options={
                        IsSuccessService && dataServices ? dataServices : []
                      }
                      isOptionEqualToValue={(option, value) =>
                        option._id === value._id
                      }
                      getOptionLabel={(option: IServiceResponse) => {
                        return option.name;
                      }}
                      onChange={(value, newValue) => {
                        if (newValue) {
                          field.onChange(newValue);
                          dispatch(
                            saveServiceDescription({
                              ...data,
                              service: newValue,
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
                          error={!!errors.service}
                          helperText={
                            !!errors.service && errors.service.message
                          }
                        />
                      )}
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
            onClick={() => dispatch(closeServiceDescription())}
          >
            Cancelar
          </Button>
          <LoadingButton
            loading={isLoading || isLoadingUpdate}
            loadingPosition="end"
            onClick={handleSubmit(async (newData) => {
              try {
                isUpdate
                  ? await updateServiceDescription({
                      ...newData,
                      _id: (data as IServiceDescriptionUpdate)._id,
                      service: (data.service as IServiceResponse)._id,
                    }).unwrap()
                  : await registerServiceDescription({
                      ...newData,
                      service: (data.service as IServiceResponse)._id,
                    }).unwrap();

                dispatch(closeServiceDescription());
                dispatch(clearServiceDescription());
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
