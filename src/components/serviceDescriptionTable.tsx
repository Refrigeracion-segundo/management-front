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
import { IServiceDescriptionUpdate, IServiceResponse } from "@/common";
import { useDispatch } from "react-redux";
import {
  useDeleteServiceDescriptionMutation,
  useFindAllServiceDescriptionQuery,
} from "@/redux/api/serviceDescription.api";
import {
  isUpdatingServiceDescription,
  openServiceDescription,
  saveServiceDescription,
} from "@/redux/slices/serviceDescription";
import { STATUS_DB } from "@/redux/constants";

export const ServiceDescriptionTable = () => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const {
    data: rows,
    isLoading,
    isFetching,
  } = useFindAllServiceDescriptionQuery();
  const [deleteRegime] = useDeleteServiceDescriptionMutation();
  const handleDelete = (name: string, id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja a ${name}? `,
    }).then(async () => {
      await deleteRegime({ id }).unwrap();
    });
  };

  const handleEdit = (data: IServiceDescriptionUpdate) => {
    dispatch(isUpdatingServiceDescription(true));
    dispatch(saveServiceDescription(data));
    dispatch(openServiceDescription());
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Descripcion</TableCell>
            <TableCell>Servicio</TableCell>
            <TableCell>Estatus</TableCell>
            <TableCell>Fecha creacion</TableCell>
            <TableCell>Ultima actualizacion</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell component="th" scope="row">
                {(row.service as IServiceResponse).name}
              </TableCell>
              <TableCell align="left">
                {row.status == STATUS_DB.ACTIVE ? "Activo" : "Eliminado"}
              </TableCell>
              <TableCell align="left">
                {moment(row.createdAt).format("LLLL")}
              </TableCell>
              <TableCell align="left">
                {moment(row.updatedAt).format("LLLL")}
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
                  onClick={() =>
                    handleEdit(row as unknown as IServiceDescriptionUpdate)
                  }
                >
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
