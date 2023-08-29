import React, { useEffect } from "react";
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
import { UseFormSetValue } from "react-hook-form";
import {
  ISpareRegister,
  IEquipmentUpdate,
  IUserUpdate,
  ROLES,
  IEquipmentResponse,
  IServiceUpdate,
} from "@/common";
import { useDispatch } from "react-redux";
import { isUpdatingSpare, openSpare } from "@/redux/slices/dialogSpare";
import { ISpareResponse } from "@/common/interfaces/spareResponse";
import {
  isUpdatingEquipment,
  openEquipment,
  saveEquipment,
} from "@/redux/slices/dialogEquipment";
import {
  useDeleteEquipmentMutation,
  useLazyFindAllEquipmentQuery,
} from "@/redux/api/equipment.api";
import {
  useDeleteServiceMutation,
  useFindAllServiceQuery,
} from "@/redux/api/services.api";
import {
  isUpdatingService,
  openService,
  saveService,
} from "@/redux/slices/service";

export const ServiceTable = () => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const { data: rows, isLoading } = useFindAllServiceQuery();
  const [deleteService, {}] = useDeleteServiceMutation();

  const handleDelete = (name: string, id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja a ${name}? :(`,
    })
      .then(() => {
        deleteService({ id });
      })
      .catch(() => {
        /* ... */
      });
  };

  const handleEdit = (data: IServiceUpdate) => {
    console.log(data);
    dispatch(saveService({ ...data }));
    dispatch(isUpdatingService(true));
    dispatch(openService());
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Estatus</TableCell>
            <TableCell>Fecha creacio</TableCell>
            <TableCell>Ultima actualizacion</TableCell>

            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>

              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">
                {moment(row.createdAt).format("LLLL")}
              </TableCell>
              <TableCell align="left">
                {moment(row.updatedAt).format("LLLL")}
              </TableCell>

              <TableCell>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(row.name, row._id)}
                >
                  <Delete />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleEdit(row as unknown as IServiceUpdate)}
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
