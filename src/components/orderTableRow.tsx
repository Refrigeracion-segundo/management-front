"use client";
import {
  IClientResponse,
  IClientUpdate,
  IOrderDataResponse,
  IOrderUpdate,
  IRegimeResponse,
  IServiceDescriptionResponse,
} from "@/common";
import { useDeleteClientMutation } from "@/redux/api";
import { STATUS_DB } from "@/redux/constants";
import { currencyMx } from "@/redux/constants/formatCurrency";
import {
  isUpdatingClient,
  openClient,
  saveClient,
} from "@/redux/slices/dialogClient";

import {
  openOrder,
  pushOrderService,
  saveDirection,
  saveEquipment,
  saveOrderClient,
  saveOrderGeneral,
  saveTechnician,
} from "@/redux/slices/order";
import { RootState } from "@/redux/store";
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
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const STATUS = new Map<string, string>();

STATUS.set("paid", "PAGADO");
STATUS.set("invoiced", "FACTURADO");
STATUS.set("paid and invoiced", "PAGADO Y FACTURADO");
STATUS.set("pending", "PENDIENTE");
STATUS.set("in progress", "EN PROGRESO");
STATUS.set("canceled", "CANCELADA");

export const OrderTableRows = (props: {
  row: IOrderDataResponse;
  total: number;
}) => {
  const { row, total } = props;
  const [open, setOpen] = useState(false);
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [deleteClient] = useDeleteClientMutation();
  const handleDelete = (name: number, id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja al usuario ${name}? `,
    }).then(() => {
      deleteClient({ id });
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
        report: data.report,
        startDate: data?.startDate,
        endDate: data?.endDate,
      })
    );

    const auxEquipment = [
      ...data.services.map((p) => {
        return {
          //   _id: v4(),
          equipment: p.equipment,
          brand: p.brand,
          model: p.model,
          serie: p.serie,
        };
      }),
    ];
    dispatch(saveEquipment(auxEquipment));
    data.services.forEach((service) => {
      dispatch(
        pushOrderService({
          service: {
            ...service.serviceDescription,
            service: {
              ...service.service,
            },
          },
          equipment: {
            equipment: service.equipment,
            brand: service.brand,
            model: service.model,
            serie: service.serie,
          },
        })
      );
    });
    dispatch(openOrder());
  };

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
          {row.report}
        </TableCell>
        <TableCell align="left">{row.customer.name}</TableCell>

        <TableCell align="left">
          {row?.startDate
            ? moment(row.startDate).format("LLLL")
            : "SIN FECHA DE INICIO"}
        </TableCell>
        <TableCell align="left">{STATUS.get(row.status)}</TableCell>
        <TableCell align="left">
          {moment(row.createdAt).format("LLLL")}
        </TableCell>
        <TableCell align="left">
          {moment(row.updatedAt).format("LLLL")}
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
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
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
