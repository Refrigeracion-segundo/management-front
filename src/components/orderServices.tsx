import {
  IEquipmentResponse,
  IOrderEquipment,
  IOrderService,
  IServiceDescriptionResponse,
  IServiceResponse,
} from "@/common";
import { useLazyFindAllServiceDescriptionQuery } from "@/redux/api/serviceDescription.api";
import { useLazyFindAllServiceQuery } from "@/redux/api/services.api";
import { currencyMx } from "@/redux/constants/formatCurrency";
import {
  deleteAllServices,
  deleteOrderService,
  pushOrderService,
  updateOrderService,
} from "@/redux/slices/order";
import { RootState } from "@/redux/store";
import { Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export const OrderServices = () => {
  const { equipment, service, total } = useSelector(
    (store: RootState) => store.order
  );
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const {
    formState: { errors },
    handleSubmit,

    register,
  } = useForm<IOrderService>();
  const [
    getServices,
    {
      data: dataSvcTypes,
      isLoading: isLoadingService,
      isSuccess: isSuccessService,
    },
  ] = useLazyFindAllServiceQuery();
  const [
    getSvcDescription,
    {
      data: dataSvcDescription,
      isLoading: isLoadingSvcDescription,
      isSuccess: isSuccessSvcDescription,
    },
  ] = useLazyFindAllServiceDescriptionQuery();
  const [selectService, setSelectService] = useState<IServiceResponse>();
  const [selectServiceDescription, setSelectServiceDescription] =
    useState<IServiceDescriptionResponse>();
  const [selectEquipment, setSelectEquipment] = useState<IOrderEquipment>();

  const deleteService = (index: number) => {
    confirm({
      description: "Seguro que quiere eliminar el servicio?",
    }).then(() => {
      dispatch(deleteOrderService(index));
    });
  };

  const deleteAll = () => {
    confirm({
      description: "Seguro que quiere eliminar el servicio?",
    }).then(() => {
      dispatch(deleteAllServices());
    });
  };

  const createOptionEquipment = (equipment: any): string => {
    let label = `${equipment.equipment.name} -`;
    for (const key in equipment) {
      console.log(key);
      if (
        equipment[key] &&
        key !== "equipment" &&
        key !== "_id" &&
        key !== "brand"
      )
        label += ` ${equipment[key]} -`;
    }
    console.log(label);
    return label.substring(0, label.length - 1);
  };
  return (
    <>
      <Grid
        item
        container
        xs={12}
        columnSpacing={2}
        rowSpacing={2}
        alignItems="end"
      >
        <br />
        <br />
        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            loading={isLoadingService}
            onOpen={() => getServices()}
            options={isSuccessService && dataSvcTypes ? dataSvcTypes : []}
            getOptionLabel={(option) => `${option.description} `}
            onChange={(_, value) => {
              if (value) {
                setSelectService(value);
              }
            }}
            sx={{ marginTop: "-3px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                margin="dense"
                label="Tipo de servicio"
                {...register("service", {
                  required: {
                    value: false,
                    message: "Este campo es requerido",
                  },
                })}
                error={!!errors.service}
                helperText={!!errors.service && errors.service.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            loading={isLoadingSvcDescription}
            onOpen={() => getSvcDescription()}
            options={
              isSuccessSvcDescription && dataSvcDescription
                ? dataSvcDescription
                : []
            }
            getOptionLabel={(option) => `${option.name}`}
            onChange={(_, value) => {
              if (value) {
                setSelectServiceDescription(value);
              }
            }}
            sx={{ marginTop: "-3px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                margin="dense"
                label="Descripción de servicio"
                {...register("svcDescription", {
                  required: {
                    value: false,
                    message: "Este campo es requerido",
                  },
                })}
                error={!!errors.svcDescription}
                helperText={
                  !!errors.svcDescription && errors.svcDescription.message
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            options={equipment}
            getOptionLabel={(option) => createOptionEquipment(option)}
            groupBy={(option) => `Marca: ${option.brand.toUpperCase()}`}
            onChange={(e, value) => {
              if (value) {
                setSelectEquipment(value);
              }
            }}
            sx={{ marginTop: "-3px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                margin="dense"
                label="Equipo"
                {...register("equipment", {
                  required: {
                    value: false,
                    message: "Este campo es requerido",
                  },
                })}
                error={!!errors.equipment}
                helperText={!!errors.equipment && errors.equipment.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            onClick={handleSubmit(() => {
              if (
                !service.find(
                  (p) =>
                    p.service._id == selectService?._id &&
                    p.equipment._id == selectEquipment?._id
                )
              )
                dispatch(
                  pushOrderService({
                    service: selectService as any,
                    svcDescription: selectServiceDescription as any,
                    equipment: selectEquipment as any,
                  })
                );
              else
                enqueueSnackbar("Este servicio ya existe con ese equipo", {
                  variant: "error",
                });
            })}
          >
            Añadir servicio
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            endIcon={<Delete />}
            color="secondary"
            onClick={deleteAll}
            style={{ float: "left" }}
          >
            Eliminar Todo
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Servicio</TableCell>
                  <TableCell>Descripción del servicio</TableCell>
                  <TableCell>Equipo</TableCell>
                  <TableCell>Marca</TableCell>
                  <TableCell>Serie</TableCell>
                  <TableCell>Capacidad HP</TableCell>
                  <TableCell>Precio sugerido</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {service.map((svc, index) => (
                  <TableRow key={index}>
                    <TableCell>{svc.service?.description}</TableCell>
                    <TableCell>{svc.svcDescription.name}</TableCell>
                    <TableCell>{svc.equipment.equipment.name}</TableCell>
                    <TableCell>{svc.equipment.brand}</TableCell>
                    <TableCell>
                      {svc.equipment.serie ? svc.equipment.serie : "------"}
                    </TableCell>
                    <TableCell>
                      {svc.equipment.capacity
                        ? `${svc.equipment.capacity} HP`
                        : "------"}
                    </TableCell>
                    <TableCell>
                      <TextField
                        defaultValue={svc.svcDescription.suggestedPrice}
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                        onChange={(e) => {
                          if (Number(e.target.value) > 0) {
                            dispatch(
                              updateOrderService({
                                index: index,
                                price: Number(e.target.value),
                              })
                            );
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell onClick={() => deleteService(index)}>
                      <IconButton color="secondary">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={1} />
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>{currencyMx.format(total)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};
