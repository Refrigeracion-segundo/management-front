"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete, Edit, Replay } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  TableFooter,
  TablePagination,
} from "@mui/material";
import moment from "moment";
import { useConfirm } from "material-ui-confirm";
import { UseFormSetValue } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  EnhancedTableHead,
  HeadCell,
  ISpareUpdate,
  Order,
  getComparator,
  stableSort,
} from "@/common";

import {
  closeSpare,
  isUpdatingSpare,
  openSpare,
  saveSpare,
} from "@/redux/slices/dialogSpare";

// import { useDeleteSpareMutation, useLazyFindAllSpareQuery } from "@/redux/api";
import { currencyMx } from "@/redux/constants/formatCurrency";
import { STATUS_DATA } from "@/redux/constants";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { enqueueSnackbar } from "notistack";
import { RootState } from "@/redux/store";
import {
  useDeleteSpareMutation,
  useLazyFindAllSpareQuery,
  useReactiveMutation,
} from "@/redux/api/spare.api";

export const TableSpare = (props: {
  setValue: UseFormSetValue<ISpareUpdate>;
}) => {
  const { setValue } = props;
  const [getSpare, { data: rows, isSuccess, isLoading, isFetching }] =
    useLazyFindAllSpareQuery();
  const {
    filters: { filter, search },
  } = useSelector((store: RootState) => store.dialogSpare);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteSpare] = useDeleteSpareMutation();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("description");
  const confirm = useConfirm();
  const dispatch = useDispatch();

  useEffect(() => {
    getSpare({
      filter,
      search,
    });
  }, [filter, search]);

  const [reactivateSpare, { isLoading: isLoadingSpare }] =
    useReactiveMutation();

  const handleDelete = async (name: string, _id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja a ${name}? `,
    }).then(async () => {
      try {
        await deleteSpare({ _id }).unwrap();
        dispatch(closeSpare());
        enqueueSnackbar("Eliminado con existo", { variant: "success" });
      } catch {
        enqueueSnackbar("Intente de nuevo mas tarde", { variant: "error" });
      }
    });
  };

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const headCells: readonly HeadCell[] = [
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: "Descripción",
    },
    {
      id: "suggestedPrice",
      numeric: false,
      disablePadding: false,
      label: "Precio sugerido",
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: false,
      label: "Fecha creación",
    },
    {
      id: "updatedAt",
      numeric: false,
      disablePadding: false,
      label: "Ultima actualización",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Estatus",
    },
    {
      id: "edit",
      numeric: true,
      disablePadding: true,
      label: "",
    },
  ];

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
    dispatch(openSpare());
    dispatch(isUpdatingSpare(true));
    dispatch(saveSpare({ ...data }));
    // setValue({ ...data }, is);
    setValue("description", data.description);
    setValue("suggestedPrice", data.suggestedPrice);
  };

  const reactivate = (id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas reactivar esta refacción?`,
    }).then(() => {
      reactivateSpare(id);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <EnhancedTableHead
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(rows ? rows : [], getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((row: any) => (
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
                <TableCell>{STATUS_DATA.get(row.status)?.translate}</TableCell>
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

                  <IconButton
                    color="primary"
                    onClick={() => reactivate(row._id)}
                    disabled={row.status == "active"}
                  >
                    {!isLoadingSpare ? (
                      <Replay />
                    ) : (
                      <CircularProgress size={15} />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                {
                  label: "All",
                  value: parseInt(rows ? rows.length.toString() : "0"),
                },
              ]}
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
