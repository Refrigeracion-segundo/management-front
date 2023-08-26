"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import moment from "moment";
import { useConfirm } from "material-ui-confirm";
import { UseFormSetValue } from "react-hook-form";
import {
  IClientResponse,
  IClientUpdate,
  IUserRegister,
  IUserUpdate,
  ROLES,
} from "@/common";
import { useDispatch } from "react-redux";
import { isUpdatingUser, open } from "@/redux/slices/dialogUser";
import { CustomerTableRows } from "./customerTableRows";
import { useFindAllClientsQuery } from "@/redux/api";

export const CustomerTable = (props: {
  setValue: UseFormSetValue<IClientUpdate>;
}) => {
  const { setValue } = props;
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const { data: rows, isSuccess } = useFindAllClientsQuery();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Nombre completo</TableCell>
            <TableCell align="left">Celular</TableCell>
            <TableCell align="left">Persona de contacto</TableCell>
            <TableCell align="left">Estatus</TableCell>
            <TableCell align="left">Fecha registro</TableCell>
            <TableCell align="left">Ultima actualizacion</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isSuccess &&
            rows?.map((row, index) => (
              <CustomerTableRows
                key={index}
                row={row as unknown as IClientResponse}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
