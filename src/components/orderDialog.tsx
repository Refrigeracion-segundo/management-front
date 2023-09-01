"use client";
import { closeOrder, openOrder } from "@/redux/slices/order";
import { RootState } from "@/redux/store";
import { Add } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FilledTextFieldProps,
  Grid,
  IconButton,
  OutlinedTextFieldProps,
  Paper,
  Stack,
  StandardTextFieldProps,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextFieldVariants,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useLazyFindUserTechniciansQuery } from "@/redux/api";
import { IUserResponse } from "@/common";
// import { DesktopDatePicker } from "@mui/lab";
export const OrderDialog = () => {
  const {
    openDialog,
    isUpdate,
    data: dataOrder,
  } = useSelector((store: RootState) => store.order);
  const dispatch = useDispatch();
  const [value, setValue] = useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );

  const [
    getUsers,
    { data: dataUsers, isLoading: isLoadingUsers, isSuccess: IsSuccessUser },
  ] = useLazyFindUserTechniciansQuery();

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <div>
      <IconButton onClick={() => dispatch(openOrder())}>
        <Add />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={() => dispatch(closeOrder())}
        fullScreen
        // maxWidth="xl"
      >
        <DialogTitle>
          <Typography align="center">Formulario de ordenes</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12}>
              <TextField placeholder="Report" size="small" fullWidth />
            </Grid>
            <Grid item xs={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={6}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat={"MM/DD/YYYY"}
                    value={value}
                    onChange={handleChange}
                    renderInput={(params: any) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat={"MM/DD/YYYY" as any}
                    value={value}
                    onChange={handleChange}
                    renderInput={(
                      params: React.JSX.IntrinsicAttributes & {
                        variant?: TextFieldVariants | undefined;
                      } & Omit<
                          | OutlinedTextFieldProps
                          | FilledTextFieldProps
                          | StandardTextFieldProps,
                          "variant"
                        >
                    ) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                blurOnSelect
                multiple
                defaultValue={
                  isUpdate
                    ? (dataOrder.tech as Array<IUserResponse>)
                    : ("" as any)
                }
                loading={isLoadingUsers}
                onOpen={() => getUsers()}
                id="fiscalRegime"
                options={IsSuccessUser && dataUsers ? dataUsers : []}
                getOptionLabel={(option: IUserResponse) => {
                  return option?.name
                    ? `${option.name} ${option.lastName}`
                    : "";
                }}
                onChange={(value, newValue) => {
                  if (newValue) {
                    // dispatch(
                    //   saveClient({
                    //     ...dataClient,
                    //     fiscalRegime: newValue?._id,
                    //   })
                    // );
                    // clearErrors("fiscalRegime");
                  }
                }}
                fullWidth
                // sx={{ width: 300, marginTop: "-3px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    margin="dense"
                    label="Tecnicos"
                    fullWidth
                    // {...register("fiscalRegime", { required: true })}
                    // error={!!errors.fiscalRegime}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                blurOnSelect
                multiple
                defaultValue={
                  isUpdate
                    ? (dataOrder.tech as Array<IUserResponse>)
                    : ("" as any)
                }
                loading={isLoadingUsers}
                onOpen={() => getUsers()}
                id="fiscalRegime"
                options={IsSuccessUser && dataUsers ? dataUsers : []}
                getOptionLabel={(option: IUserResponse) => {
                  return option?.name
                    ? `${option.name} ${option.lastName}`
                    : "";
                }}
                onChange={(value, newValue) => {
                  if (newValue) {
                    // dispatch(
                    //   saveClient({
                    //     ...dataClient,
                    //     fiscalRegime: newValue?._id,
                    //   })
                    // );
                    // clearErrors("fiscalRegime");
                  }
                }}
                fullWidth
                // sx={{ width: 300, marginTop: "-3px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    margin="dense"
                    label="Clientes"
                    fullWidth
                    // {...register("fiscalRegime", { required: true })}
                    // error={!!errors.fiscalRegime}
                  />
                )}
              />
            </Grid>

            <Grid
              item
              container
              spacing={2}
              columnSpacing={2}
              justifyContent="space-between"
              xs={12}
            >
              <Grid item xs={4}>
                <TextField
                  disabled
                  value="México"
                  variant="standard"
                  margin="dense"
                  id="pais"
                  label="Pais"
                  type="text"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  disablePortal
                  // defaultValue={
                  //   isUpdate
                  //     ? { id: 0, name: dataClient.state as string }
                  //     : dataClient.state
                  //     ? (dataClient.state as ICityState)
                  //     : { id: 0, name: "" }
                  // }
                  options={[]}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option: { id: number; name: string }) =>
                    option.name
                  }
                  onChange={(e, value) => {
                    console.log(value);
                    if (value) {
                      // setStateName(value.name);
                      // dispatch(saveClient({ ...dataClient, state: value }));
                      // clearErrors("state");
                    }
                  }}
                  // fullWidth
                  sx={{ marginTop: "-3px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      margin="dense"
                      label="Estado"

                      // {...register("state", {
                      //   required: {
                      //     value: false,
                      //     message: "Este campo es requerido",
                      //   },
                      // })}

                      // error={!!errors.state}
                      // helperText={!!errors.state && errors.state.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  disablePortal
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  // defaultValue={
                  //   // isUpdate
                  //   //   ? { id: 0, name: dataClient.city as string }
                  //   //   : { id: 0, name: "" }
                  // }
                  options={[]}
                  getOptionLabel={(option: { id: number; name: string }) =>
                    option.name
                  }
                  sx={{ marginTop: "-3px" }}
                  // fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      margin="dense"
                      label="Ciudad"
                      // {...register("city", {
                      //   required: {
                      //     value: false,
                      //     message: "La ciudad es requerida",
                      //   },
                      // })}
                      // onChange={(e) => {
                      //   setCityName(e.target.value);
                      // }}
                      // error={!!errors.city}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="standard"
                  margin="dense"
                  id="zipCode"
                  label="*Código postal"
                  type="number"
                  size="small"
                  fullWidth
                  // {...register("zipCode", {
                  //   required: {
                  //     value: true,
                  //     message: "Código postal invalido",
                  //   },
                  //   pattern: {
                  //     value: /^\d{5}$/,
                  //     message: "Código postal invalido",
                  //   },
                  //   minLength: {
                  //     value: 5,
                  //     message: "La minima longitud es de 5 caracteres.",
                  //   },
                  //   maxLength: {
                  //     value: 5,
                  //     message: "La maxima longitud es de 5 caracteres.",
                  //   },
                  // })}
                  // error={!!errors.zipCode}
                  // helperText={!!errors.zipCode && errors.zipCode.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  margin="dense"
                  id="suburb"
                  label="Colonia"
                  type="text"
                  size="small"
                  fullWidth
                  // {...register("suburb", {
                  //   required: {
                  //     value: false,
                  //     message: "La colonia es requerida",
                  //   },
                  // })}
                  // error={!!errors.suburb}
                  // helperText={!!errors.suburb && errors.suburb.message}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="standard"
                  margin="dense"
                  id="streetNumber"
                  label="Numero exterior"
                  type="number"
                  size="small"
                  // {...register("streetNumber", {
                  //   required: {
                  //     value: false,
                  //     message: "Numero exterior requerido",
                  //   },
                  // })}
                  // error={!!errors.apartmentNumber}
                  // helperText={
                  //   !!errors.apartmentNumber && errors.apartmentNumber.message
                  // }
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="standard"
                  margin="dense"
                  id="street"
                  label="Calle"
                  type="text"
                  size="small"
                  fullWidth
                  // {...register("street", {
                  //   required: {
                  //     value: false,
                  //     message: "La calle es requerida",
                  //   },
                  // })}
                  // error={!!errors.street}
                  // helperText={!!errors.street && errors.street.message}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="standard"
                  margin="dense"
                  id="apartmentNumber"
                  label="Numero interior"
                  type="number"
                  size="small"
                  // {...register("apartmentNumber", {
                  //   required: {
                  //     value: false,
                  //     message: "Numero interior requerido",
                  //   },
                  // })}
                  // error={!!errors.streetNumber}
                  // helperText={
                  //   !!errors.streetNumber && errors.streetNumber.message
                  // }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">Servicios</Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                columnSpacing={2}
                alignItems="end"
                justifyContent="space-between"
              >
                <Grid item xs={8}>
                  <Autocomplete
                    disablePortal
                    // defaultValue={
                    //   isUpdate
                    //     ? { id: 0, name: dataClient.state as string }
                    //     : dataClient.state
                    //     ? (dataClient.state as ICityState)
                    //     : { id: 0, name: "" }
                    // }
                    options={[]}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option: { id: number; name: string }) =>
                      option.name
                    }
                    onChange={(e, value) => {
                      console.log(value);
                      if (value) {
                        // setStateName(value.name);
                        // dispatch(saveClient({ ...dataClient, state: value }));
                        // clearErrors("state");
                      }
                    }}
                    // fullWidth
                    sx={{ marginTop: "-3px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        margin="dense"
                        label="Servicio"
                        // sx={{ width: "115%" }}
                        // {...register("state", {
                        //   required: {
                        //     value: false,
                        //     message: "Este campo es requerido",
                        //   },
                        // })}

                        // error={!!errors.state}
                        // helperText={!!errors.state && errors.state.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="standard"
                    margin="dense"
                    id="apartmentNumber"
                    label="Equipo"
                    fullWidth
                    size="small"
                    // {...register("apartmentNumber", {
                    //   required: {
                    //     value: false,
                    //     message: "Numero interior requerido",
                    //   },
                    // })}
                    // error={!!errors.streetNumber}
                    // helperText={
                    //   !!errors.streetNumber && errors.streetNumber.message
                    // }
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="standard"
                    margin="dense"
                    id="apartmentNumber"
                    label="Marca"
                    size="small"
                    fullWidth
                    // {...register("apartmentNumber", {
                    //   required: {
                    //     value: false,
                    //     message: "Numero interior requerido",
                    //   },
                    // })}
                    // error={!!errors.streetNumber}
                    // helperText={
                    //   !!errors.streetNumber && errors.streetNumber.message
                    // }
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="standard"
                    margin="dense"
                    id="apartmentNumber"
                    label="Modelo"
                    size="small"
                    fullWidth
                    // {...register("apartmentNumber", {
                    //   required: {
                    //     value: false,
                    //     message: "Numero interior requerido",
                    //   },
                    // })}
                    // error={!!errors.streetNumber}
                    // helperText={
                    //   !!errors.streetNumber && errors.streetNumber.message
                    // }
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="standard"
                    margin="dense"
                    id="apartmentNumber"
                    label="Serie"
                    size="small"
                    fullWidth
                    // {...register("apartmentNumber", {
                    //   required: {
                    //     value: false,
                    //     message: "Numero interior requerido",
                    //   },
                    // })}
                    // error={!!errors.streetNumber}
                    // helperText={
                    //   !!errors.streetNumber && errors.streetNumber.message
                    // }
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button>Añadir servicio</Button>
                </Grid>
              </Grid>

              <Grid>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre del servicio</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};
