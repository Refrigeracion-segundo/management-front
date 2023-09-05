"use client";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
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
import { UseFormSetValue } from "react-hook-form";
import { ISpareUpdate } from "@/common";
import { useDispatch } from "react-redux";
import {
  closeSpare,
  isUpdatingSpare,
  openSpare,
  saveSpare,
} from "@/redux/slices/dialogSpare";

import { useDeleteSpareMutation, useFindAllSpareQuery } from "@/redux/api";
import { currencyMx } from "@/redux/constants/formatCurrency";
import { STATUS_DB } from "@/redux/constants";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { enqueueSnackbar } from "notistack";

export const TableSpare = (props: {
  setValue: UseFormSetValue<ISpareUpdate>;
}) => {
  const { setValue } = props;
  const { data: rows, isLoading, isFetching } = useFindAllSpareQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteSpare] = useDeleteSpareMutation();
  const confirm = useConfirm();
  const dispatch = useDispatch();

  const handleDelete = async (name: string, id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja a ${name}? `,
    }).then(async () => {
      try {
        await deleteSpare({ id }).unwrap();
        dispatch(closeSpare());
        enqueueSnackbar("Eliminado con existo", { variant: "success" });
      } catch {
        enqueueSnackbar("Intente de nuevo mas tarde", { variant: "error" });
      }
    });
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

  const handleEdit = (data: ISpareUpdate) => {
    console.log(data);
    dispatch(openSpare());
    dispatch(isUpdatingSpare(true));
    dispatch(saveSpare({ ...data }));
    // setValue({ ...data }, is);
    setValue("description", data.description);
    setValue("suggestedPrice", data.suggestedPrice);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Descripcion</TableCell>
            <TableCell>Precio sugerido</TableCell>
            <TableCell>Fecha creacion</TableCell>
            <TableCell>Ultima actualizacion</TableCell>
            <TableCell>Estatus</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          )?.map((row) => (
            <TableRow
              key={row.description}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell component="th" scope="row">
                {currencyMx.format(row.suggestedPrice)}
              </TableCell>

              <TableCell align="left">
                {moment(row.createdAt).format("LLLL")}
              </TableCell>
              <TableCell align="left">
                {moment(row.updatedAt).format("LLLL")}
              </TableCell>
              <TableCell>
                {row.status == STATUS_DB.ACTIVE ? "Activo" : "Eliminado"}
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
                  onClick={() => handleEdit(row as unknown as ISpareUpdate)}
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
