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
import { UseFormSetValue } from "react-hook-form";
import {
  ISpareRegister,
  IEquipmentUpdate,
  IUserUpdate,
  ROLES,
  IEquipmentResponse,
} from "@/common";
import { useDispatch } from "react-redux";
import { isUpdatingSpare, openSpare } from "@/redux/slices/dialogSpare";
import { ISpareResponse } from "@/common/interfaces/spareResponse";
import {
  isUpdatingEquipment,
  openEquipment,
  saveEquipment,
} from "@/redux/slices/dialogEquipment";

function createData(data: IEquipmentResponse) {
  return data;
}

const rows = [
  createData({
    _id: "",
    name: "Test 1",

    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
];

export const EquipmentTable = () => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const handleDelete = (name: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja a ${name}? :(`,
    })
      .then(() => {
        /* ... */
      })
      .catch(() => {
        /* ... */
      });
  };

  const handleEdit = (data: IEquipmentUpdate) => {
    dispatch(saveEquipment({ _id: data._id, name: data.name }));
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
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
                  onClick={() => handleDelete(row._id)}
                >
                  <Delete />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleEdit(row as unknown as IEquipmentUpdate)}
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
