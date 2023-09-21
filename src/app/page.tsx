"use client";

import { currencyMx } from "@/redux/constants/formatCurrency";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  Paper,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Chart from "react-google-charts";
import { Controller, useForm } from "react-hook-form";
import {
  AreaChart,
  Card,
  DonutChart,
  LineChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";
import {
  useFindOrdersQuery,
  useFindTotalQuery,
  useLazyFindOrdersQuery,
  useLazyFindTotalQuery,
} from "@/redux/api/dashboard.api";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { saveFiltersDashboard } from "@/redux/slices/dashboard";
import { useLazyFindAllOrderQuery } from "@/redux/api";
import { STATUS_ORIGINAL } from "@/redux/constants";
import useUser from "./lib/hooks/useUser";
const data = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 600],
  ["2015", 1170, 460, 710],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 490],
];

const optionsBar = {
  title: "Company Performance",
  titleTextStyle: { color: "#FFF" }, // Cambia el color del título
  hAxis: { title: "Year", textStyle: { color: "#FFF" } },
  vAxis: { title: "Amount", textStyle: { color: "#FFF" } },
  legendTextStyle: { color: "#FFF" },
  backgroundColor: "#222", // Fondo oscuro
  colors: ["#2196F3", "#F44336", "#4CAF50"], // Colores de las barras
};

const dataPie = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Sleep", 7],
  ["Relax", 4],
];

const optionsPie = {
  title: "Daily Activities",
  titleTextStyle: { color: "#FFF" }, // Cambia el color del título
  legendTextStyle: { color: "#FFF" },
  backgroundColor: "#222", // Fondo oscuro
  colors: ["#2196F3", "#F44336", "#4CAF50", "#FF9800"], // Colores de las secciones
};

const dataLine = [
  ["Year", "Sales", "Expenses"],
  ["2014", 1000, 400],
  ["2015", 1170, 460],
  ["2016", 660, 1120],
  ["2017", 1030, 540],
];

const optionsLine = {
  title: "Company Performance (Dark Theme)",
  titleTextStyle: { color: "#FFF" }, // Cambiar el color del título
  hAxis: { title: "Year", textStyle: { color: "#FFF" } }, // Cambiar el color del texto del eje X
  vAxis: { title: "Amount", textStyle: { color: "#FFF" } }, // Cambiar el color del texto del eje Y
  legendTextStyle: { color: "#FFF" }, // Cambiar el color del texto de la leyenda
  backgroundColor: "#222", // Establecer el fondo oscuro
  colors: ["#2196F3", "#F44336"], // Colores de las líneas
};

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];

const chartdataNew = [
  {
    year: 1970,
    "Export Growth Rate": 2.04,
    "Import Growth Rate": 1.53,
  },
  {
    year: 1971,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.58,
  },
  {
    year: 1972,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.61,
  },
  {
    year: 1973,
    "Export Growth Rate": 1.93,
    "Import Growth Rate": 1.61,
  },
  {
    year: 1974,
    "Export Growth Rate": 1.88,
    "Import Growth Rate": 1.67,
  },
  //...
];
const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("mx").format(number).toString();
};

export default function Home() {
  const { control } = useForm();
  const dispatch = useDispatch();
  const home = useUser({ redirectTo: "/login" });
  const { filters } = useSelector((store: RootState) => store.dashboard);
  const [
    getTotals,
    { data: dataTotal, isLoading: isLoadingTotal, isFetching: isFetchingTotal },
  ] = useLazyFindTotalQuery();
  const [getOrders, { data: dataOrder1 }] = useLazyFindAllOrderQuery();
  const [getOrdersNoPaid, { data: dataOrder2 }] = useLazyFindAllOrderQuery();

  useEffect(() => {
    getTotals({
      fromDate: filters.fromDate,
      toDate: filters.toDate,
      status: filters.status as string,
    });
    getOrders({
      perPage: 30,
      page: 1,
      fromDate: filters.fromDate,
      toDate: filters.toDate,
      orderId: 0,
      status: STATUS_ORIGINAL.FINISHED,
    });
    getOrdersNoPaid({
      perPage: 30,
      page: 1,
      fromDate: filters.fromDate,
      toDate: filters.toDate,
      orderId: 0,
      status: STATUS_ORIGINAL.INVOICED,
    });
  }, [filters.fromDate, filters.toDate, filters.status]);
  return (
    home.user && (
      <Box sx={{ p: 15 }}>
        <Grid container spacing={5}>
          <Grid
            item
            container
            xs={12}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              xs={2}
              component={Paper}
              sx={{
                p: 2,
                backgroundColor: " #a7414a",
                userSelect: "none",
                transition: "background-color 0.3s, transform 0.3s",
                "&:hover": {
                  backgroundColor: "#933942",
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
            >
              {isLoadingTotal || isFetchingTotal ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={30} />
                </div>
              ) : (
                <>
                  <Typography align="center">
                    {dataTotal?.total.total}
                  </Typography>
                  <Typography align="center">Ordenes Totales</Typography>
                  <Typography align="center">
                    Total:{" "}
                    {currencyMx.format(dataTotal?.total.amount as number)}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid
              item
              xs={2}
              component={Paper}
              sx={{
                p: 2,
                backgroundColor: "#282726",
                userSelect: "none",
                transition: "background-color 0.3s, transform 0.3s",
                "&:hover": {
                  backgroundColor: "#262524",
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
            >
              {isLoadingTotal || isFetchingTotal ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={30} />
                </div>
              ) : (
                <>
                  <Typography align="center">
                    {dataTotal?.["paid and invoiced"].total}
                  </Typography>
                  <Typography align="center">Pagadas y facturadas</Typography>
                  <Typography align="center">
                    Total:
                    {currencyMx.format(
                      dataTotal?.["paid and invoiced"].amount as number
                    )}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid
              item
              xs={2}
              component={Paper}
              sx={{
                p: 2,
                backgroundColor: "#6a8a82",
                userSelect: "none",
                transition: "background-color 0.3s, transform 0.3s",
                "&:hover": {
                  backgroundColor: "#617e77",
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
            >
              {isLoadingTotal || isFetchingTotal ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={30} />
                </div>
              ) : (
                <>
                  <Typography align="center">
                    {dataTotal?.invoiced.total}
                  </Typography>
                  <Typography align="center">
                    Facturadas y no pagadas
                  </Typography>
                  <Typography align="center">
                    Total:{" "}
                    {currencyMx.format(dataTotal?.invoiced.amount as number)}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid
              item
              xs={2}
              component={Paper}
              sx={{
                p: 2,
                backgroundColor: "#a37c27",
                userSelect: "none",
                transition: "background-color 0.3s, transform 0.3s",
                "&:hover": {
                  backgroundColor: "#9c7625",
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
            >
              {isLoadingTotal || isFetchingTotal ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={30} />
                </div>
              ) : (
                <div>
                  <Typography align="center">
                    {dataTotal?.pending.total as number}
                  </Typography>
                  <Typography align="center">Pendientes de iniciar</Typography>
                  <Typography align="center">
                    Total:{" "}
                    {currencyMx.format(dataTotal?.pending.amount as number)}
                  </Typography>
                </div>
              )}
            </Grid>
            <Grid
              item
              xs={2}
              component={Paper}
              sx={{
                p: 2,
                backgroundColor: "#563838",
                userSelect: "none",
                transition: "background-color 0.3s, transform 0.3s",
                "&:hover": {
                  backgroundColor: "#4f3333",
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
            >
              {isLoadingTotal || isFetchingTotal ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={30} />
                </div>
              ) : (
                <>
                  <Typography align="center">
                    {dataTotal?.["in progress"].total}
                  </Typography>
                  <Typography align="center">sin iniciar</Typography>
                  <Typography align="center">
                    Total:{" "}
                    {currencyMx.format(
                      dataTotal?.["in progress"].amount as number
                    )}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            spacing={2}
            justifyContent="space-between"
          >
            <Grid item container xs={2.22} sx={{ p: 2 }} height="315px">
              {/* <Paper> */}
              <Grid
                item
                container
                component={Paper}
                rowGap={4}
                sx={{ p: 2 }}
                style={{ backgroundColor: "#080d1f" }}
              >
                <Grid item xs={12}>
                  <Controller
                    name="city"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Autocomplete
                        value={field.value}
                        // loading={isLoadingCities}
                        options={[]}
                        onChange={(_, newValue) => {
                          field.onChange(newValue);
                        }}
                        getOptionLabel={(option) => {
                          return typeof option == "string"
                            ? option
                            : option.name;
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Usuarios"
                            variant="standard"
                            margin="dense"
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="startDate"
                      control={control}
                      rules={{
                        required: {
                          value: false,
                          message: "Selecciona una fecha valida",
                        },
                      }}
                      defaultValue={
                        new Date(moment().startOf("month").format())
                      }
                      render={({ field }) => {
                        return (
                          <DesktopDatePicker
                            label="Fecha de inicio"
                            inputFormat={"MM/DD/YYYY"}
                            value={field.value}
                            onChange={(value: any) => {
                              if (value) {
                                field.onChange(value);
                                dispatch(
                                  saveFiltersDashboard({
                                    ...filters,
                                    fromDate: new Date(value),
                                  })
                                );
                                // setUseDates(true);
                                // dispatch(
                                //   saveOrderGeneral({
                                //     ...general,
                                //     startDate: new Date(value),
                                //   })
                                // );
                              }
                            }}
                            renderInput={(params) => (
                              <TextField {...params} fullWidth size="small" />
                            )}
                          />
                        );
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="endDate"
                      control={control}
                      rules={{
                        required: {
                          value: false,
                          message: "Selecciona una fecha valida",
                        },
                      }}
                      defaultValue={new Date(moment().endOf("month").format())}
                      render={({ field }) => {
                        return (
                          <DesktopDatePicker
                            label="Fecha final"
                            inputFormat={"MM/DD/YYYY"}
                            value={field.value}
                            onChange={(value: any) => {
                              if (value) {
                                field.onChange(value);
                                dispatch(
                                  saveFiltersDashboard({
                                    ...filters,
                                    toDate: new Date(value),
                                  })
                                );
                                // setUseDates(true);
                                // dispatch(
                                //   saveOrderGeneral({
                                //     ...general,
                                //     startDate: new Date(value),
                                //   })
                                // );
                              }
                            }}
                            renderInput={(params) => (
                              <TextField {...params} fullWidth size="small" />
                            )}
                          />
                        );
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Card
                style={{
                  height: "280px",
                  maxHeight: "280px",
                  overflowY: "auto",
                }}
              >
                <Title>Ordenes facturadas y pagadas</Title>
                <Table className="mt-5">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell># Orden</TableHeaderCell>
                      <TableHeaderCell>Nombre cliente</TableHeaderCell>
                      <TableHeaderCell>Total</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataOrder1?.data.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>{order.customer.name}</TableCell>
                        <TableCell>{currencyMx.format(order.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </Grid>

            <Grid item xs={5.5}>
              <Card
                style={{
                  height: "280px",
                  maxHeight: "280px",
                  overflowY: "auto",
                }}
              >
                <Title>Ordenes facturadas no pagadas</Title>
                <Table className="mt-5">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell># Orden</TableHeaderCell>
                      <TableHeaderCell>Nombre cliente</TableHeaderCell>
                      <TableHeaderCell># Cliente</TableHeaderCell>
                      <TableHeaderCell>Total</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataOrder2?.data.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>{order.customer.name}</TableCell>
                        <TableCell>{order.customer.phone}</TableCell>
                        <TableCell>{currencyMx.format(order.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card>
                <AreaChart
                  className="h-72 mt-4"
                  data={chartdata}
                  index="date"
                  style={{ height: "240px" }}
                  categories={["SemiAnalysis", "The Pragmatic Engineer"]}
                  colors={["indigo", "cyan"]}
                  valueFormatter={dataFormatter}
                />
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card className="max-w-lg">
                <Title>Sales</Title>
                <DonutChart
                  className="mt-6"
                  data={cities}
                  category="sales"
                  index="name"
                  valueFormatter={dataFormatter}
                  colors={[
                    "slate",
                    "violet",
                    "indigo",
                    "rose",
                    "cyan",
                    "amber",
                  ]}
                />
                <Title>Usuario</Title>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card>
                <Title>Export/Import Growth Rates (1970 to 2021)</Title>
                <LineChart
                  className="mt-5"
                  data={chartdataNew}
                  style={{ height: "210px" }}
                  index="year"
                  categories={["Export Growth Rate", "Import Growth Rate"]}
                  colors={["emerald", "gray"]}
                  valueFormatter={dataFormatter}
                  yAxisWidth={50}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  );
}
