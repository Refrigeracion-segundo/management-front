"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useFindAllOrderQuery, useLazyFindAllOrderQuery } from "@/redux/api";
import { OrderTableRows } from "./orderTableRow";
import { CircularProgress, TableFooter, TablePagination } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const OrderTable = () => {
  const [getOrders, { data: rows, isSuccess, isLoading, isFetching }] =
    useLazyFindAllOrderQuery();
  const {
    filters: { orderId, description, fromDate, toDate },
  } = useSelector((store: RootState) => store.order);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getOrders({
      perPage: rowsPerPage,
      page: page + 1,
      orderId,
      description,
      fromDate,
      toDate,
    });
  }, [rowsPerPage, page, orderId, description, fromDate, toDate]);

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
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={8}
              count={isSuccess ? (rows?.total as number) : 0}
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
