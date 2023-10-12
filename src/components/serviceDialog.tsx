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
import { useForm } from "react-hook-form";
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
import { enqueueSnackbar } from "notistack";

export const DialogService = () => {
  const {
    openDialog,
    isUpdate,
    data: dataService,
  } = useSelector((store: RootState) => store.service);
  const {
    formState: { errors },
    register,
    handleSubmit,
    clearErrors,
    reset,
  } = useForm<IServiceRegister>();
  const [
    getEquipment,
    {
      data: dataEquipment,
      isLoading: isLoadingEquipment,
      isSuccess: isSuccessEquipment,
      isFetching: isFetchingEquipment,
    },
  ] = useLazyFindAllEquipmentQuery();
  const [registerService, { isSuccess: isSuccessRegister }] =
    useRegisterServiceMutation();
  const [updateService, { isSuccess: isSuccessUpdate }] =
    useUpdateServiceMutation();

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
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              textAlign="center"
              style={{ marginRight: "9%" }}
            >
              Formulario de Servicios
            </Typography>

            <div style={{ width: 250 }}>
              <Autocomplete
                autoFocus
                disablePortal
                defaultValue={
                  isUpdate ? dataService.equipmentType : ("" as any)
                }
                loading={isLoadingEquipment}
                onOpen={() => getEquipment({ filter:'', search: '' })}
                // multiple
                options={
                  isSuccessEquipment
                    ? (dataEquipment as unknown as Array<IEquipmentResponse>)
                    : []
                }
                onChange={(value, newValue) => {
                  if (newValue && newValue.name !== "Seleccione") {
                    dispatch(
                      saveService({
                        ...dataService,
                        equipmentType: newValue as any as IEquipmentResponse,
                      })
                    );
                    clearErrors("equipmentType");
                  }
                }}
                // isOptionEqualToValue={(option, value) =>
                //   option.name === value.name
                // }
                getOptionLabel={(option) => (!!option?.name ? option.name : "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo de equipamiento"
                    {...register("equipmentType", {
                      required: {
                        value: true,
                        message: "Seleccione un equipamiento válido",
                      },
                      value: dataService.equipmentType,
                    })}
                    helperText={
                      !!errors.equipmentType && errors.equipmentType.message
                    }
                    error={!!errors.equipmentType}
                  />
                )}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            direction="row"
            spacing={2}
            sx={{ marginTop: 1 }}
          >
            <Grid item xs={5}>
              <TextField
                fullWidth
                placeholder="Nombre"
                {...register("name", {
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },
                  value: dataService.name,
                })}
                onChange={(e) => {
                  if (e.target.value)
                    dispatch(
                      saveService({ ...dataService, name: e.target.value })
                    );
                }}
                helperText={!!errors.name && errors.name.message}
                error={!!errors.name}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                type="number"
                placeholder="Precio sugerido"
                {...register("suggestedPrice", {
                  required: {
                    value: true,
                    message: "El precio sugerido es requerido",
                  },
                  min: {
                    value: 0,
                    message: "El precio tiene que ser mTestayor a 0",
                  },
                  valueAsNumber: true,
                  value: dataService.suggestedPrice,
                })}
                onChange={(e) => {
                  if (e.target.value)
                    dispatch(
                      saveService({
                        ...dataService,
                        suggestedPrice: parseFloat(e.target.value),
                      })
                    );
                }}
                helperText={
                  !!errors.suggestedPrice && errors.suggestedPrice.message
                }
                error={!!errors.suggestedPrice}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                placeholder="Capacidad de equipamiento"
                {...register("equipmentCapacity", {
                  required: {
                    value: true,
                    message: "La capacidad de equipamiento es requerido",
                  },
                  value: dataService.equipmentCapacity,
                })}
                onChange={(e) => {
                  if (e.target.value)
                    dispatch(
                      saveService({
                        ...dataService,
                        equipmentCapacity: e.target.value,
                      })
                    );
                }}
                helperText={
                  !!errors.equipmentCapacity && errors.equipmentCapacity.message
                }
                error={!!errors.equipmentCapacity}
              />
            </Grid>
            <Grid item xs={5}>
              <Autocomplete
                disablePortal
                defaultValue={
                  isUpdate
                    ? ApplicationTypeTranslate.get(
                        dataService.equipmentApplication
                      )
                    : ApplicationTypeTranslate.get(
                        APPLICACTION_TYPE.AIR_CONDITIONING
                      )
                }
                // multiple
                options={Array.from(ApplicationTypeTranslate.values())}
                onChange={(value, newValue) => {
                  if (newValue)
                    dispatch(
                      saveService({
                        ...dataService,
                        equipmentApplication: newValue.key,
                      })
                    );
                  clearErrors("equipmentApplication");
                }}
                getOptionLabel={(option) => option.translate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipa de aplicacion"
                    {...register("equipmentApplication", {
                      required: {
                        value: true,
                        message: "Tipo de aplicacion",
                      },
                      value: dataService.equipmentApplication,
                    })}
                    helperText={
                      !!errors.equipmentApplication &&
                      errors.equipmentApplication.message
                    }
                    error={!!errors.equipmentApplication}
                  />
                )}
              />
            </Grid>

            <Grid item xs={10}>
              <TextField
                fullWidth
                defaultValue={isUpdate ? dataService.description : ""}
                placeholder="Descripcion"
                multiline
                rows={4}
                {...register("description", {
                  required: {
                    value: true,
                    message: "La descripcion es requerido",
                  },
                  value: dataService.description,
                })}
                onChange={(e) => {
                  if (e.target.value)
                    dispatch(
                      saveService({
                        ...dataService,
                        description: e.target.value,
                      })
                    );
                }}
                helperText={!!errors.description && errors.description.message}
                error={!!errors.description}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              dispatch(closeService());
              reset(undefined);
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit(async (data) => {
              try {
                !isUpdate
                  ? await registerService({
                      ...data,
                      equipmentType: (
                        dataService.equipmentType as IEquipmentResponse
                      )._id,
                    }).unwrap()
                  : await updateService({
                      ...data,
                      _id: (dataService as IServiceUpdate)._id as string,
                      equipmentType: (
                        dataService.equipmentType as IEquipmentResponse
                      )._id,
                    }).unwrap();
                // .then(() => {
                //   dispatch(closeService());
                //   dispatch(clearService());
                //   reset(null as any);
                // });

                dispatch(closeService());
                dispatch(clearService());
                reset(undefined);
              } catch {
                enqueueSnackbar("Intente de nuevo mas tarde", {
                  variant: "error",
                });
              }
            })}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
