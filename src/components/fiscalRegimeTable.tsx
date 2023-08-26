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
import { CircularProgress, IconButton, TableFooter } from "@mui/material";
import moment from "moment";
import { useConfirm } from "material-ui-confirm";
import { IRegimeUpdate } from "@/common";
import { useDispatch } from "react-redux";
import { saveFiscalRegime } from "@/redux/slices/fiscalRegime";
import {
  useDeleteRegimeMutation,
  useFindAllFiscalRegimeQuery,
} from "@/redux/api/fiscalRegime";

export const FiscalRegimeTable = () => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const { data: rows, isLoading, isFetching } = useFindAllFiscalRegimeQuery();
  const [deleteRegime] = useDeleteRegimeMutation();
  const handleDelete = (name: string, id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja a ${name}? :(`,
    }).then(async () => {
      await deleteRegime({ id }).unwrap();
    });
  };

  const handleEdit = (data: IRegimeUpdate) => {
    dispatch(saveFiscalRegime(data));
  };

  return (
    <TableContainer component={Paper}>
      {isLoading && <CircularProgress />}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Clave</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Estatus</TableCell>
            <TableCell>Fecha creacio</TableCell>
            <TableCell>Ultima actualizacion</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
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
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">
                {moment(row.createdAt).format("YYYY-MM")}
              </TableCell>
              <TableCell align="left">
                {moment(row.updatedAt).format("YYYY-MM")}
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
          {(isLoading || isFetching) && (
            <TableCell colSpan={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </div>
            </TableCell>
          )}
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
