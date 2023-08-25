import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete, Edit } from "@mui/icons-material";
import { CircularProgress, IconButton, Skeleton } from "@mui/material";
import moment from "moment";
import { useConfirm } from "material-ui-confirm";
import { UseFormSetValue } from "react-hook-form";
import { IUserRegister, IUserUpdate, ROLES } from "@/common";
import { useDispatch } from "react-redux";
import { isUpdatingUser, open, saveUser } from "@/redux/slices/dialogUser";
import { useDeleteUserMutation, useLazyFindAllUsersQuery } from "@/redux/api";

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
  const [getUsers, { data, isLoading }] = useLazyFindAllUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = (name: string, id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja al usuario ${name}? :(`,
    }).then(() => {
      deleteUser({ id });
    });
  };

  const handleEdit = (data: IUserUpdate) => {
    dispatch(open());
    dispatch(isUpdatingUser(true));
    // setValue({ ...data }, is);
    dispatch(saveUser(data));
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
          {isLoading ? (
            <CircularProgress />
          ) : (
            data?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.roles[0]}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(row.name, row._id)}
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
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
