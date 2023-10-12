"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  EnhancedTableHead,
  HeadCell,
  IClientResponse,
  Order,
  getComparator,
  stableSort,
} from "@/common";
import { CustomerTableRows } from "./customerTableRows";
import {
  useLazyFindAllClientsQuery,
} from "@/redux/api";
import { CircularProgress, TableFooter, TablePagination } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const CustomerTable = () => {
  const { filters } = useSelector((state: RootState) => state.dialogClient);
  const [getCustomers, { data: rows, isSuccess, isLoading, isFetching }] =
    useLazyFindAllClientsQuery();
  // const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("name");

  useEffect(() => {
    getCustomers(filters);
  }, [filters]);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const headCells: readonly HeadCell[] = [
    {
      id: "expand",
      numeric: false,
      disablePadding: false,
      label: "",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Nombre completo",
    },
    {
      id: "phone",
      numeric: false,
      disablePadding: false,
      label: "Celular",
    },
    {
      id: "contactPerson",
      numeric: false,
      disablePadding: false,
      label: "Persona de contacto",
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: false,
      label: "Fecha creación",
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
          {isSuccess &&
            stableSort(rows ? rows : [], getComparator(order, orderBy)).map(
              (row: any) => (
                <CustomerTableRows
                  key={row._id}
                  row={row as unknown as IClientResponse}
                />
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
                  value: parseInt(rows ? rows.length.toString() : "0"),
                },
              ]}
              colSpan={10}
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
