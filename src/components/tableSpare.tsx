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
import { ISpareRegister, ISpareUpdate, IUserUpdate, ROLES } from "@/common";
import { useDispatch } from "react-redux";
import { isUpdatingSpare, openSpare } from "@/redux/slices/dialogSpare";
import { ISpareResponse } from "@/common/interfaces/spareResponse";

function createData(data: ISpareResponse) {
  return data;
}

const rows = [
  createData({
    _id: "",
    description: "Test 1",
    suggestedPrice: 233,
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
];

export const TableSpare = (props: {
  setValue: UseFormSetValue<ISpareUpdate>;
}) => {
  const { setValue } = props;
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

  const handleEdit = (data: ISpareUpdate) => {
    console.log(data);
    dispatch(openSpare());
    dispatch(isUpdatingSpare(true));
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
            <TableCell>Fecha creacio</TableCell>
            <TableCell>Ultima actualizacion</TableCell>
            <TableCell>Estatus</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.description}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.suggestedPrice}
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
                  onClick={() => handleDelete(row.description)}
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
      </Table>
    </TableContainer>
  );
};
