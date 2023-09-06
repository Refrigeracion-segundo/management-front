"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useFindAllOrderQuery } from "@/redux/api";
import { OrderTableRows } from "./orderTableRow";

export const OrderTable = () => {
  const { data: rows, isSuccess } = useFindAllOrderQuery();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Persona que reporto el servicio</TableCell>
            <TableCell align="left">Cliente</TableCell>
            <TableCell align="left">Fecha de inicio</TableCell>
            <TableCell align="left">Fecha registro</TableCell>
            <TableCell align="left">Ultima actualización</TableCell>
            <TableCell align="left">Estatus</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isSuccess &&
            rows?.data.map((row, index) => (
              <OrderTableRows key={index} row={row} total={row.total} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
