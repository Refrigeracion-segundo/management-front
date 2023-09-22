"use client";
import { IClientResponse, IClientUpdate, IRegimeResponse } from "@/common";
import { useDeleteClientMutation } from "@/redux/api";
import { STATUS_DB } from "@/redux/constants";
import {
  isUpdatingClient,
  openClient,
  saveClient,
} from "@/redux/slices/dialogClient";
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
import { useDispatch } from "react-redux";

export const CustomerTableRows = (props: { row: IClientResponse }) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [deleteClient] = useDeleteClientMutation();
  const handleDelete = (name: string, id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja al cliente ${name}? `,
    }).then(() => {
      deleteClient({ id });
    });
  };

  const handleEdit = (data: IClientUpdate) => {
    dispatch(openClient());
    dispatch(saveClient(data));
    dispatch(isUpdatingClient(true));
  };

  return (
    <Fragment key={row.rfc}>
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
          {row.name}
        </TableCell>
        <TableCell align="left">{row.phone}</TableCell>
        <TableCell align="left">{row.contactPerson}</TableCell>
        <TableCell align="left">
          {moment(row.createdAt).format("LLLL")}
        </TableCell>
        <TableCell align="left">
          {moment(row.updatedAt).format("LLLL")}
        </TableCell>
        <TableCell align="left">
          {row.status == STATUS_DB.ACTIVE ? "Activo" : "Eliminado"}
        </TableCell>

        <TableCell>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(row.name, row._id)}
          >
            <Delete />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleEdit(row as unknown as IClientUpdate)}
          >
            <Edit />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Datos generales y fiscales
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>RFC</TableCell>
                    <TableCell>Regimen fiscal</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Ciudad</TableCell>
                    <TableCell>Calle</TableCell>
                    <TableCell>Codigo postal</TableCell>
                    <TableCell>Numero interior</TableCell>
                    <TableCell>Numero exterior</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.rfc}</TableCell>
                    <TableCell>
                      {(row.fiscalRegime as IRegimeResponse).key +
                        " - " +
                        (row.fiscalRegime as IRegimeResponse).description}
                    </TableCell>
                    <TableCell>{row?.state as string}</TableCell>
                    <TableCell>{row?.city as string}</TableCell>
                    <TableCell>{row.street}</TableCell>
                    <TableCell>{row.zipCode}</TableCell>
                    <TableCell>{row.streetNumber}</TableCell>

                    <TableCell>
                      {!!row.apartmentNumber
                        ? row.apartmentNumber
                        : "SIN NUMERO"}
                    </TableCell>
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
