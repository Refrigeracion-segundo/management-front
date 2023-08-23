"use client";
import { IClientResponse, IClientUpdate } from "@/common";
import { isUpdatingClient, openClient } from "@/redux/slices/dialogClient";
import {
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

export const CustomerTableRows = (props: { row: IClientResponse }) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
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

  const handleEdit = (data: IClientUpdate) => {
    console.log(data);
    dispatch(openClient());
    dispatch(isUpdatingClient(true));
    // setValue("description", data.description);
    // setValue("suggestedPrice", data.suggestedPrice);
  };

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell></TableCell>
        <TableCell>
          <IconButton
            color="secondary"
            // onClick={() => handleDelete(row.name)}
          >
            <Delete />
          </IconButton>
          <IconButton
            color="secondary"
            // onClick={() => handleEdit(row as unknown as IUserUpdate)}
          >
            <Edit />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">RFC</TableCell>
                    <TableCell align="right">Calle</TableCell>
                    <TableCell align="right">Numero interior</TableCell>
                    <TableCell align="right">Numero exterior</TableCell>
                    <TableCell align="right">Estado</TableCell>
                    <TableCell align="right">Ciudad</TableCell>
                    <TableCell align="right">Regimen fiscal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
