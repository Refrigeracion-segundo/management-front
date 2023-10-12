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
import {
  EnhancedTableHead,
  HeadCell,
  IServiceUpdate,
  Order,
  getComparator,
  stableSort,
} from "@/common";
import { useDispatch, useSelector } from "react-redux";

import {
  useDeleteServiceMutation,
  useLazyFindAllServiceQuery,
  useReactiveMutation,
} from "@/redux/api/services.api";
import {
  isUpdatingService,
  openService,
  saveService,
} from "@/redux/slices/service";
import { STATUS_DATA, STATUS_DB } from "@/redux/constants";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { enqueueSnackbar } from "notistack";
import { currencyMx } from "@/redux/constants/formatCurrency";
import { ApplicationTypeTranslate } from "@/common/constants/equipmentApplication";
import { RootState } from "@/redux/store";

export const ServiceTable = () => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const { filters } = useSelector((store: RootState) => store.service);
  const [getServices, { data: rows, isLoading, isFetching }] =
    useLazyFindAllServiceQuery();
  const [deleteService, {}] = useDeleteServiceMutation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("name");

  useEffect(() => {
    getServices(filters);
  }, [filters]);

  const [reactivateService, { isLoading: isLoadingService }] =
    useReactiveMutation();

  const handleDelete = async (name: string, _id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas dar de baja a ${name}? `,
    }).then(async () => {
      try {
        await deleteService({ _id }).unwrap();
        enqueueSnackbar("Se elimino el servicio con exito", {
          variant: "success",
        });
      } catch {
        enqueueSnackbar("Intente de nuevo mas tarde", { variant: "error" });
      }
    });
  };

  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Nombre",
    },
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
      id: "equipmentCapacity",
      numeric: false,
      disablePadding: false,
      label: "Capacidad del equipo",
    },
    {
      id: "equipmentApplication",
      numeric: false,
      disablePadding: false,
      label: "Aplicación del equipo",
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

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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

  const handleEdit = (data: IServiceUpdate) => {
    dispatch(saveService({ ...data }));
    dispatch(isUpdatingService(true));
    dispatch(openService());
  };
  const reactivate = (id: string) => {
    confirm({
      title: "Hey cuidado!!",
      description: `Seguro que deseas reactivar este servicio?`,
    }).then(() => {
      reactivateService(id);
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
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.description}
                </TableCell>
                <TableCell component="th" scope="row">
                  {currencyMx.format(row.suggestedPrice)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.equipmentCapacity}
                </TableCell>
                <TableCell component="th" scope="row">
                  {
                    ApplicationTypeTranslate.get(row.equipmentApplication)
                      ?.translate
                  }
                </TableCell>
                <TableCell align="left">
                  {moment(row.createdAt).format("LLLL")}
                </TableCell>
                <TableCell align="left">
                  {moment(row.updatedAt).format("LLLL")}
                </TableCell>
                <TableCell align="left">
                  {STATUS_DATA.get(row.status)?.translate}
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
                  <IconButton
                    color="primary"
                    onClick={() => reactivate(row._id)}
                    disabled={row.status == "active"}
                  >
                    {!isLoadingService ? (
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
              colSpan={9}
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
