"use client";
import {
  cleanReduxOrder,
  closeOrder,
  openOrder,
  orderUsers,
  saveDirection,
  saveOrderClient,
  saveOrderGeneral,
} from "@/redux/slices/order";
import { RootState } from "@/redux/store";
import {
  Add,
  Construction,
  EditRoad,
  HomeRepairService,
} from "@mui/icons-material";
import {
  Autocomplete,
  BottomNavigation,
  BottomNavigationAction,
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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useLazyFindAllClientsQuery,
  useLazyFindUserTechniciansQuery,
  useRegisterOrderMutation,
  useUpdateOrderMutation,
} from "@/redux/api";
import { IClientResponse, IOrderGeneral, IServiceResponse } from "@/common";
import { Controller, useForm } from "react-hook-form";
import { OrderEquipments } from "./orderEquipments";
import { OrderDirection } from "./orderDirection";
import { OrderServices } from "./orderServices";
import { makeStyles } from "@mui/styles";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { enqueueSnackbar } from "notistack";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "transparent",
    "& .Mui-selected": {
      color: "#1c1c1c",
    },
    "& .MuiBottomNavigationAction-label": {
      color: "white",
    },
  },
}));

export const OrderDialog = () => {
  const {
    openDialog,
    isUpdate,
    data: dataOrder,
    general,
    client,
    service,
    direction,
    users,
  } = useSelector((store: RootState) => store.order);
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IOrderGeneral>({
    values: {
      ...general,
    },
  });
  const dispatch = useDispatch();
  const [useDates, setUseDates] = useState<boolean>(false);
  const [valueStep, setValueStep] = useState("direction");
  const classes = useStyles();

  const handleChangeStep = (event: React.SyntheticEvent, newValue: string) => {
    setValueStep(newValue);
  };

  const [
    getUsers,
    { data: dataUsers, isLoading: isLoadingUsers, isSuccess: IsSuccessUser },
  ] = useLazyFindUserTechniciansQuery();

  const [
    getClients,
    {
      data: dataClients,
      isLoading: isLoadingClients,
      isSuccess: IsSuccessClients,
    },
  ] = useLazyFindAllClientsQuery();

  const [registerOrder, { isSuccess: isSuccessRegisterOrder }] =
    useRegisterOrderMutation();
  const [
    updateOrder,
    { isSuccess: isSuccessUpdateOrder, isLoading: isLoadingUpdateOrder },
  ] = useUpdateOrderMutation();

  return (
    <div>
      <IconButton onClick={() => dispatch(openOrder())}>
        <Add />
      </IconButton>
      <Dialog
        open={openDialog}
        fullScreen
        // maxWidth="xl"handleAddDataEquip
      >
        <DialogTitle>
          <Typography align="center">Formulario de ordenes</Typography>
        </DialogTitle>
        <br />

        <DialogContent>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Controller
                name="client"
                defaultValue={client}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Seleccione un cliente",
                  },
                }}
                render={({ field }) => (
                  <Autocomplete
                    loading={isLoadingClients}
                    onOpen={() => getClients()}
                    value={field.value}
                    options={IsSuccessClients && dataClients ? dataClients : []}
                    getOptionLabel={(option) => {
                      return option && option?.name;
                    }}
                    onChange={(value, newValue: IClientResponse) => {
                      if (newValue) {
                        field.onChange(newValue);
                        dispatch(saveOrderClient(newValue));

                        dispatch(
                          saveDirection({
                            street: newValue.street,
                            streetNumber: newValue.streetNumber,
                            apartmentNumber: newValue.apartmentNumber,
                            zipCode: newValue.zipCode,
                            suburb: newValue.suburb,
                            city: newValue.city,
                            cityId: newValue.cityId,
                            state: newValue.state,
                            stateId: newValue.stateId,
                          })
                        );
                      }
                    }}
                    fullWidth
                    // sx={{ width: 300, marginTop: "-3px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        margin="dense"
                        label="Clientes"
                        fullWidth
                        error={!!errors.client}
                        helperText={
                          !!errors.client && (errors.client.message as string)
                        }
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{
                    required: {
                      value: false,
                      message: "Selecciona una fecha valida",
                    },
                  }}
                  defaultValue={general.startDate}
                  render={({ field }) => {
                    return (
                      <DesktopDatePicker
                        label="Fecha de inicio"
                        inputFormat={"MM/DD/YYYY"}
                        value={field.value}
                        onChange={(value: any) => {
                          if (value) {
                            field.onChange(value);
                            setUseDates(true);
                            dispatch(
                              saveOrderGeneral({
                                ...general,
                                startDate: new Date(value),
                              })
                            );
                          }
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth size="small" />
                        )}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{
                    required: {
                      value: false,
                      message: "Selecciona una fecha valida",
                    },
                  }}
                  defaultValue={general.endDate}
                  render={({ field }) => {
                    return (
                      <DesktopDatePicker
                        label="Fecha de finalizacion"
                        inputFormat={"MM/DD/YYYY"}
                        value={field.value}
                        onChange={(value: any) => {
                          if (value) {
                            field.onChange(value);
                            setUseDates(true);
                            dispatch(
                              saveOrderGeneral({
                                ...general,
                                endDate: new Date(value),
                              })
                            );
                          }
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth size="small" />
                        )}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="users"
                control={control}
                rules={{
                  required: {
                    value: false,
                    message: "Seleccione tecnicos",
                  },
                }}
                defaultValue={users}
                render={({ field }) => (
                  <Autocomplete
                    disablePortal
                    blurOnSelect
                    multiple
                    value={field.value}
                    loading={isLoadingUsers}
                    onOpen={() => getUsers()}
                    options={IsSuccessUser && dataUsers ? dataUsers : []}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    getOptionLabel={(option) => {
                      return option.name;
                    }}
                    onChange={(value, newValue) => {
                      if (newValue) {
                        field.onChange(newValue);
                        dispatch(orderUsers(newValue));
                      }
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        margin="dense"
                        label="Seleccione los tecnicos"
                        error={!!errors.users}
                        helperText={!!errors.users && errors.users.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="report"
                rules={{
                  required: {
                    value: true,
                    message: "Ingrese a la persona que reporto el servicio",
                  },
                }}
                defaultValue={general.report}
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      placeholder="Nombre de la persona que reporto el servicio"
                      size="small"
                      fullWidth
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                      error={!!errors.report}
                      helperText={!!errors.report && errors.report.message}
                    />
                  );
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                rules={{
                  required: {
                    value: true,
                    message: "Ingrese una descripción de la orden",
                  },
                }}
                defaultValue={general.description}
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      placeholder="Descripción de la orden"
                      multiline
                      size="small"
                      fullWidth
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                      error={!!errors.description}
                      helperText={
                        !!errors.description && errors.description.message
                      }
                    />
                  );
                }}
              />
            </Grid>

            <Grid
              item
              container
              spacing={2}
              columnSpacing={2}
              justifyContent="space-between"
              xs={12}
            >
              <Grid item xs={12}>
                <BottomNavigation
                  value={valueStep}
                  onChange={handleChangeStep}
                  className={classes.root}
                >
                  <BottomNavigationAction
                    label="Direccion del trabajo"
                    value="direction"
                    icon={<EditRoad style={{ color: "#fff" }} />}
                  />
                  <BottomNavigationAction
                    label="Equipos a reparar"
                    value="equipments"
                    icon={<Construction style={{ color: "#fff" }} />}
                  />
                  <BottomNavigationAction
                    label="Servicios"
                    value="services"
                    icon={<HomeRepairService style={{ color: "#fff" }} />}
                  />
                </BottomNavigation>
              </Grid>

              <Grid item xs={12}>
                {valueStep == "direction" ? (
                  <OrderDirection />
                ) : valueStep == "equipments" ? (
                  <OrderEquipments />
                ) : (
                  <OrderServices />
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              dispatch(closeOrder());
              dispatch(cleanReduxOrder());
            }}
          >
            Cerrar
          </Button>
          <Button
            onClick={handleSubmit(async (data) => {
              {
                const aux: any = {
                  report: data.report,
                  startDate: useDates ? general.startDate : undefined,
                  endDate: useDates ? general.endDate : undefined,
                  technicians: !!users.length ? users : undefined,
                  customer: client._id,
                  ...direction,
                  description: data.description,
                  services: service.map((p) => {
                    return {
                      service: (p.service.service as IServiceResponse)._id,
                      serviceDescription: p.service._id,
                      equipment: p.equipment.equipment,
                      brand: p.equipment.brand,
                      model: p.equipment.model,
                      price: (p.service.service as IServiceResponse)
                        .suggestedPrice,
                      serie: p.equipment.serie,
                    };
                  }),
                };
                try {
                  !isUpdate
                    ? await registerOrder(aux).unwrap()
                    : await updateOrder({ ...aux, _id: general._id }).unwrap();
                  dispatch(closeOrder());
                  enqueueSnackbar("Orden registrada correctamente", {
                    variant: "success",
                  });
                  dispatch(cleanReduxOrder());
                } catch {
                  enqueueSnackbar("Intente de nuevo mas tarde", {
                    variant: "error",
                  });
                }
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
