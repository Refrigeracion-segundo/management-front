import {
  IOrderEquipment,
  IOrderService,
  IServiceDescriptionResponse,
  IServiceResponse,
} from "@/common";
import { useLazyFindAllServiceDescriptionQuery } from "@/redux/api/serviceDescription.api";
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
      data: dataServices,
      isLoading: isLoadingService,
      isSuccess: isSuccessService,
    },
  ] = useLazyFindAllServiceDescriptionQuery();
  const [selectService, setSelectService] =
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
            options={isSuccessService && dataServices ? dataServices : []}
            getOptionLabel={(option) =>
              `${option.description} - ${
                (option.service as IServiceResponse).name
              }`
            }
            onChange={(e, value) => {
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
                label="Servicio"
                // sx={{ width: "115%" }}
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
            options={equipment}
            getOptionLabel={(option) =>
              `${option.equipment}`
            }
            onChange={(e, value) => {
              console.log(value);
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
                  <TableCell>Equipo</TableCell>
                  <TableCell>Marca</TableCell>
                  <TableCell>Serie</TableCell>
                  <TableCell>Precio sugerido</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {service.map((svc, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {svc.service.description} -{" "}
                      {(svc.service.service as IServiceResponse).name}
                    </TableCell>
                    <TableCell>{svc.equipment.equipment}</TableCell>
                    <TableCell>{svc.equipment.brand}</TableCell>
                    <TableCell>{svc.equipment.serie}</TableCell>
                    <TableCell>
                      <TextField
                        defaultValue={
                          (svc.service.service as IServiceResponse)
                            .suggestedPrice
                        }
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
