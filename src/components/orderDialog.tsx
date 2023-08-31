"use client";
import { closeOrder, openOrder } from "@/redux/slices/order";
import { RootState } from "@/redux/store";
import { Add } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FilledTextFieldProps,
  Grid,
  IconButton,
  OutlinedTextFieldProps,
  Stack,
  StandardTextFieldProps,
  TextField,
  TextFieldVariants,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
export const OrderDialog = () => {
  const { openDialog } = useSelector((store: RootState) => store.order);
  const dispatch = useDispatch();
  const [value, setValue] = useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );

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
        fullWidth
      >
        <DialogTitle>
          <Typography>Formulario de ordenes</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item>
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
            <Grid item>
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
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};
