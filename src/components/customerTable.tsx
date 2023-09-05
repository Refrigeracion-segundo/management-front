"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IClientResponse } from "@/common";
import { CustomerTableRows } from "./customerTableRows";
import { useFindAllClientsQuery } from "@/redux/api";

export const CustomerTable = () => {
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
            <TableCell align="left">Fecha registro</TableCell>
            <TableCell align="left">Ultima actualizacion</TableCell>
            <TableCell align="left">Estatus</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isSuccess &&
            rows?.map((row) => (
              <CustomerTableRows
                key={row._id}
                row={row as unknown as IClientResponse}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
