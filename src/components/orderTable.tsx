"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLazyFindAllOrderQuery } from "@/redux/api";
import { OrderTableRows } from "./orderTableRow";
import { CircularProgress, TableFooter, TablePagination } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  EnhancedTableHead,
  HeadCell,
  Order,
  getComparator,
  stableSort,
} from "@/common";
import moment from "moment";

export const OrderTable = () => {
  const [getOrders, { data: rows, isSuccess, isLoading, isFetching }] =
    useLazyFindAllOrderQuery();
  const {
    filters: { orderId, fromDate, toDate, filter, search },
  } = useSelector((store: RootState) => store.order);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState("orderId");

  useEffect(() => {
    getOrders({
      perPage: rowsPerPage,
      page: page + 1,
      orderId,
      fromDate: new Date(moment(fromDate).startOf("month").format()),
      toDate: new Date(moment(toDate).endOf("month").format()),
      filter,
      search,
    });
  }, [rowsPerPage, page, orderId, fromDate, toDate, filter, search]);

  const headCells: readonly HeadCell[] = [
    {
      id: "expand",
      numeric: true,
      disablePadding: false,
      label: "",
    },
    {
      id: "orderId",
      numeric: true,
      disablePadding: false,
      label: "# Orden",
    },
    {
      id: "report",
      numeric: false,
      disablePadding: false,
      label: "Persona que reporto el servicio",
    },
    {
      id: "customer.name",
      numeric: false,
      disablePadding: false,
      label: "Cliente",
    },
    {
      id: "startDate",
      numeric: false,
      disablePadding: false,
      label: "Fecha de inicio",
    },
    {
      id: "endDate",
      numeric: false,
      disablePadding: false,
      label: "Fecha de finalización",
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: false,
      label: "Fecha registro",
    },
    {
      id: "updatedAt",
      numeric: false,
      disablePadding: false,
      label: "Ultima actualización",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Estatus",
    },
    {
      id: "edit",
      numeric: true,
      disablePadding: true,
      label: "",
    },
  ];

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
        <EnhancedTableHead
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(rows ? rows.data : [], getComparator(order, orderBy)).map(
            (row: any, index: any) => (
              <OrderTableRows key={index} row={row} total={row.total} />
            )
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                {
                  label: "All",
                  value: parseInt(rows ? rows.total.toString() : "0"),
                },
              ]}
              colSpan={10}
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
