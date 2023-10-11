import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete, Edit } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { UseFormSetValue } from "react-hook-form";
import { EnhancedTableHead, HeadCell, IUserUpdate, Order, RoleTranslate, getComparator, stableSort } from "@/common";
import { useDispatch } from "react-redux";
import { isUpdatingUser, open, saveUser } from "@/redux/slices/dialogUser";
import { useDeleteUserMutation, useFindAllUsersQuery } from "@/redux/api";
import { STATUS_DATA } from "@/redux/constants";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { enqueueSnackbar } from "notistack";
import moment from "moment";

export const TableUser = (props: {
  setValue: UseFormSetValue<IUserUpdate>;
}) => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const { data: rows, isLoading, isFetching } = useFindAllUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState('name')

  const handleDelete = async (name: string, _id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja al usuario ${name}? `,
    }).then(async () => {
      try {
        await deleteUser({ _id }).unwrap();
        enqueueSnackbar("Usuario eliminado correctamente", {
          variant: "success",
        });
      } catch {
        enqueueSnackbar("Ocurrio un error al eliminar al usuario", {
          variant: "error",
        });
      }
    });
  };

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const headCells: readonly HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Usuario',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Email',
    },
    {
      id: 'roles',
      numeric: false,
      disablePadding: false,
      label: 'Roles',
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: false,
      label: 'Fecha creación',
    },
    {
      id: "updatedAt",
      numeric: false,
      disablePadding: false,
      label: 'Ultima actualización',
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: 'Estatus',
    },
    {
      id: 'edit',
      numeric: true,
      disablePadding: true,
      label: '',
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

  const handleEdit = (data: IUserUpdate) => {
    dispatch(open());
    dispatch(isUpdatingUser(true));
    // setValue({ ...data }, is);
    dispatch(saveUser(data));
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
          {stableSort(rows ? rows : [], getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((row: any) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${row.name} ${row.lastName}`}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="right">
                {RoleTranslate.get(row.roles[0])?.translate}
              </TableCell>
              <TableCell align="right">
                {moment(row.createdAt).format("LLLL")}
              </TableCell>
              <TableCell align="right">
                {moment(row.updatedAt).format("LLLL")}
              </TableCell>
              <TableCell align="right">
              { STATUS_DATA.get(row.status)?.translate }
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
                  onClick={() => handleEdit(row as unknown as IUserUpdate)}
                >
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: parseInt(rows ? rows.length.toString() : '0') }]}
              colSpan={8}
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
