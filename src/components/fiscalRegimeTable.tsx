"use client";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete, Edit } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  TableFooter,
  TablePagination,
} from "@mui/material";
import moment from "moment";
import { useConfirm } from "material-ui-confirm";
import { EnhancedTableHead, HeadCell, IRegimeUpdate, Order, getComparator, stableSort } from "@/common";
import { useDispatch } from "react-redux";
import { saveFiscalRegime } from "@/redux/slices/fiscalRegime";
import {
  useDeleteRegimeMutation,
  useFindAllFiscalRegimeQuery,
} from "@/redux/api/fiscalRegime";
import { STATUS_DATA } from "@/redux/constants";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

export const FiscalRegimeTable = () => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const { data: rows, isLoading, isFetching } = useFindAllFiscalRegimeQuery();
  const [deleteRegime] = useDeleteRegimeMutation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState('key')
  
  const handleDelete = (name: string, _id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja a ${name}? `,
    }).then(async () => {
      await deleteRegime({ _id }).unwrap();
    });
  };

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const headCells: readonly HeadCell[] = [
    {
      id: 'key',
      numeric: false,
      disablePadding: false,
      label: 'Clave',
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'Descripción',
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: false,
      label: 'Fecha creación',
    },
    {
      id: "updatedAt",
      numeric: false,
      disablePadding: false,
      label: 'Ultima actualización',
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: 'Estatus',
    },
    {
      id: 'edit',
      numeric: true,
      disablePadding: true,
      label: '',
    },
  ];

  const handleEdit = (data: IRegimeUpdate) => {
    dispatch(saveFiscalRegime(data));
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
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
        <TableBody>
          {stableSort(rows ? rows : [], getComparator(order, orderBy)).map((row: any) => (
            <TableRow
              key={row.key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell align="left">
                {moment(row.createdAt).format("LLLL")}
              </TableCell>
              <TableCell align="left">
                {moment(row.updatedAt).format("LLLL")}
              </TableCell>
              <TableCell align="left">
                {STATUS_DATA.get(row.status)?.translate}
              </TableCell>

              <TableCell>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(row.description, row._id)}
                >
                  <Delete />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleEdit(row as unknown as IRegimeUpdate)}
                >
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: parseInt(rows ? rows.length.toString() : '0') }]}
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
