import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function createData(
  name: string,
  calories: string,
  fat: string,
  carbs: Date,
  protein: Date
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Jose Alberto", "Administrador", "Activo", new Date(), new Date()),
];

export const TableUser = () => {
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
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs.toString()}</TableCell>
              <TableCell align="right">{row.protein.toString()}</TableCell>
              <TableCell>
                <IconButton color="secondary">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
