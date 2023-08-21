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
import { IUserRegister, IUserUpdate, ROLES } from "@/common";
import { useDispatch } from "react-redux";
import { isUpdatingUser, open } from "@/redux/slices/dialogUser";

function createData(
  name: string,
  email: string,
  lastName: string,
  rol: string,
  protein: string
) {
  return { name, email, lastName, rol, protein };
}

const rows = [
  createData(
    "Jose Alberto",
    "jose@gmail.com",
    "Zamarripa",
    ROLES.ADMIN,
    // "Activo",
    moment(new Date()).format("YYYY-MM-DD")
  ),
];

export const TableUser = (props: {
  setValue: UseFormSetValue<IUserUpdate>;
}) => {
  const { setValue } = props;
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const handleDelete = (name: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja al usuario ${name}? :(`,
    })
      .then(() => {
        /* ... */
      })
      .catch(() => {
        /* ... */
      });
  };

  const handleEdit = (data: IUserUpdate) => {
    console.log(data);
    dispatch(open());
    dispatch(isUpdatingUser(true));
    // setValue({ ...data }, is);
    setValue("email", data.email);
    setValue("lastName", data.lastName);
    setValue("name", data.name);
    setValue("rol", data.rol);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell align="right">Roles</TableCell>
            <TableCell align="right">Estatus</TableCell>
            <TableCell align="right">Fecha de creación</TableCell>
            <TableCell align="right">Ultima actualización</TableCell>
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
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.rol.toString()}</TableCell>
              <TableCell align="right">{row.protein.toString()}</TableCell>
              <TableCell>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(row.name)}
                >
                  <Delete />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleEdit(row as unknown as IUserUpdate)}
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
