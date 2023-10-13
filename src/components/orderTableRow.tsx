"use client";
import { IOrderDataResponse, IOrderEquipment } from "@/common";
import { useDeleteOrderMutation } from "@/redux/api";
import { currencyMx } from "@/redux/constants/formatCurrency";

import {
  isUpdatingOrder,
  openOrder,
  pushOrderService,
  pushSpareOrder,
  saveDirection,
  saveEquipment,
  saveNumOrder,
  saveOrderClient,
  saveOrderGeneral,
  saveTechnician,
} from "@/redux/slices/order";
import {
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { OrderMenuStatus } from "./orderMenuStatus";
import { v4 } from "uuid";

export const OrderTableRows = (props: {
  row: IOrderDataResponse;
  total: number;
}) => {
  const { row, total } = props;
  const [open, setOpen] = useState(false);
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [deleteOrderApi, { isLoading: isLoadingDelete }] =
    useDeleteOrderMutation();
  const handleDelete = (name: number, _id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: "Seguro que desea eliminar esta orden?",
    }).then(async () => {
      try {
        await deleteOrderApi({ _id }).unwrap();
        enqueueSnackbar("Eliminación completada");
      } catch {
        // enqueueSnackbar("Intente de nuevo mas tarde", { variant: "error" });
      }
    });
  };

  const handleEdit = (data: IOrderDataResponse) => {
    dispatch(
      saveDirection({
        street: data.street,
        streetNumber: data.streetNumber,
        apartmentNumber: data.apartmentNumber,
        zipCode: data.zipCode,
        suburb: data.suburb,
        city: data.city,
        cityId: data.cityId,
        state: data.state,
        stateId: data.stateId,
      })
    );
    dispatch(saveTechnician(data.technicians));
    dispatch(saveOrderClient(data.customer));
    dispatch(
      saveOrderGeneral({
        _id: data._id,
        report: data.report,
        startDate: data?.startDate,
        endDate: data?.endDate,
        description: data?.description,
      })
    );

    const auxEquipment: Array<IOrderEquipment> = [];

    data.services.forEach((service) => {
      const uid = v4();
      dispatch(
        pushOrderService({
          service: {
            ...service.serviceDescription,
            service: {
              ...service.service,
            },
          },
          equipment: {
            _id: uid,
            equipment: service.equipment,
            brand: service.brand,
            model: service.model,
            serie: service.serie,
          },
        })
      );
      auxEquipment.push({
        _id: uid,
        equipment: service.equipment,
        brand: service.brand,
        model: service.model,
        serie: service.serie,
      });
    });
    dispatch(saveEquipment(auxEquipment));
    data.spares?.forEach((p) => {
      dispatch(
        pushSpareOrder({
          ...p.spare,
          quantity: p.quantity,
          suggestedPrice: p.price,
        })
      );
    });
    dispatch(saveNumOrder(data.orderId));
    dispatch(isUpdatingOrder(true));
    dispatch(openOrder());
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openAnchor = Boolean(anchorEl);

  return (
    <Fragment key={row._id}>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.report}
        </TableCell>
        <TableCell align="left">{row.customer.name}</TableCell>
        <TableCell align="left">
          {row?.startDate
            ? moment(row.startDate).format("LLLL")
            : "SIN FECHA DE INICIO"}
        </TableCell>
        <TableCell align="left">
          {row?.endDate
            ? moment(row.endDate).format("LLLL")
            : "SIN FECHA DE FINALIZACIÓN"}
        </TableCell>
        <TableCell align="left">
          {moment(row.createdAt).format("LLLL")}
        </TableCell>
        <TableCell align="left">
          {moment(row.updatedAt).format("LLLL")}
        </TableCell>
        <TableCell align="left">
          <OrderMenuStatus status={row.status as string} _id={row._id} />
        </TableCell>
        <TableCell>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(row.orderId, row._id)}
          >
            <Delete />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleEdit(row)}>
            <Edit />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Descripción
              </Typography>
              <Typography variant="body1" gutterBottom component="div">
                {row.description}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Datos de la orden
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Mantenimiento</TableCell>
                    <TableCell>Equipo</TableCell>
                    <TableCell>Marca</TableCell>
                    <TableCell>Modelo</TableCell>
                    <TableCell>Serie</TableCell>
                    <TableCell>Precio dado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.services.map((service) => {
                    return (
                      <TableRow key={service.service._id}>
                        <TableCell>
                          {service.serviceDescription.description} -{" "}
                          {service.service.name}
                        </TableCell>
                        <TableCell>{service.equipment}</TableCell>
                        <TableCell>{service.brand}</TableCell>
                        <TableCell>{service.model}</TableCell>
                        <TableCell>{service.serie}</TableCell>
                        <TableCell>
                          {currencyMx.format(service.price)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell rowSpan={1} />
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>{currencyMx.format(total)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Refacción</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.spares?.map((spare) => {
                    return (
                      <TableRow>
                        <TableCell>{spare.spare.description}</TableCell>
                        <TableCell>{currencyMx.format(spare.price)}</TableCell>
                        <TableCell>{spare.quantity}</TableCell>
                        <TableCell>
                          {currencyMx.format(spare.price * spare.quantity)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
