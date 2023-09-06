"use client";
import React, { useState } from "react";
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
import { CircularProgress, TableFooter, TablePagination } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

export const CustomerTable = () => {
  const {
    data: rows,
    isSuccess,
    isLoading,
    isFetching,
  } = useFindAllClientsQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
            <TableCell align="left">Ultima actualización</TableCell>
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
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={rows ? rows.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Elementos por pagina"
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {(isLoading || isFetching) && <CircularProgress />}
      </div>
    </TableContainer>
  );
};
