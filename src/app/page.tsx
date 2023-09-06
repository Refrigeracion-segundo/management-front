"use client";

import { currencyMx } from "@/redux/constants/formatCurrency";
import {
  Autocomplete,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Chart from "react-google-charts";
import { Controller, useForm } from "react-hook-form";

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

export default function Home() {
  const { control } = useForm();
  return (
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
            <Typography align="center">12</Typography>
            <Typography align="center">Ordenes Totales</Typography>
            <Typography align="center">
              Total: {currencyMx.format(12312)}
            </Typography>
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
            <Typography align="center">12</Typography>
            <Typography align="center">Pagadas y facturadas</Typography>
            <Typography align="center">
              Total: {currencyMx.format(12312)}
            </Typography>
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
            <Typography align="center">12</Typography>
            <Typography align="center">Facturadas y no pagadas</Typography>
            <Typography align="center">
              Total: {currencyMx.format(12312)}
            </Typography>
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
            <Typography align="center">12</Typography>
            <Typography align="center">Pendientes de iniciar</Typography>
            <Typography align="center">
              Total: {currencyMx.format(12312)}
            </Typography>
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
            <Typography align="center">12</Typography>
            <Typography align="center">sin iniciar</Typography>
            <Typography align="center">
              Total: {currencyMx.format(12312)}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container xs={12} spacing={2} justifyContent="space-between">
          <Grid item container xs={2.22} sx={{ p: 2 }} height="315px">
            {/* <Paper> */}
            <Grid item container component={Paper} rowGap={4} sx={{ p: 2 }}>
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
                        return typeof option == "string" ? option : option.name;
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
                    // defaultValue={general.startDate}
                    render={({ field }) => {
                      return (
                        <DesktopDatePicker
                          label="Fecha de inicio"
                          inputFormat={"MM/DD/YYYY"}
                          value={field.value}
                          onChange={(value: any) => {
                            if (value) {
                              field.onChange(value);
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
                    name="startDate"
                    control={control}
                    rules={{
                      required: {
                        value: false,
                        message: "Selecciona una fecha valida",
                      },
                    }}
                    // defaultValue={general.startDate}
                    render={({ field }) => {
                      return (
                        <DesktopDatePicker
                          label="Fecha final"
                          inputFormat={"MM/DD/YYYY"}
                          value={field.value}
                          onChange={(value: any) => {
                            if (value) {
                              field.onChange(value);
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
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: "285px",
                height: "285px",
              }}
            >
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      <Typography align="center">
                        Ordenes Facturadas y pagadas
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Servicio</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell>skjdfdkls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>skjdfdkls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>skjdfdkls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>skjdfdkls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>skjdfdkls</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={5.5}>
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: "285px",
                height: "285px",
              }}
            >
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
                      <Typography align="center">
                        Ordenes facturadas y no pagadas
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Servicio</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Teléfono</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell>skjdfdkls</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={4}>
            <Chart
              chartType="BarChart"
              width="100%"
              height="300px"
              data={data}
              options={optionsBar}
              rootProps={{ "data-testid": "1" }}
            />
          </Grid>

          <Grid item xs={4}>
            <Chart
              chartType="PieChart"
              width="100%"
              height="400px"
              data={dataPie}
              options={optionsPie}
              rootProps={{ "data-testid": "1" }}
            />
          </Grid>

          <Grid item xs={4}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={dataLine}
              options={optionsLine}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
