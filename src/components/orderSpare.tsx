"use client";
import { ISpareResponse } from "@/common";
import { useLazyFindAllSpareQuery } from "@/redux/api/spare.api";
import { currencyMx } from "@/redux/constants/formatCurrency";
import {
  deleteAllSparesOrder,
  deleteOneSpareOrder,
  pushSpareOrder,
  updateSpareOrder,
} from "@/redux/slices/order";
import { RootState } from "@/redux/store";
import { Add, Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CSSTransitionGroup from "react-addons-css-transition-group";

export const OrderSpare = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { spares } = useSelector((state: RootState) => state.order);
  const [spare, setSpare] = useState<ISpareResponse>();
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const [getSpare, { data: listSpare, isLoading, isSuccess }] =
    useLazyFindAllSpareQuery();

  const deleteSpare = (index: number) => {
    confirm({
      description: "Seguro que quiere eliminar la refacción?",
    }).then(() => {
      dispatch(deleteOneSpareOrder(index));
    });
  };
  const deleteAllSpares = () => {
    confirm({
      description:
        "Seguro que quiere eliminar todos las refacciones de la orden?",
    }).then(() => {
      dispatch(deleteAllSparesOrder());
    });
  };
  const saveNewSpare = (data: any) => {
    const { listSpare } = data;
    // console.log("data >> ", data);
    const exist = spares.find((p) => p._id == listSpare._id);
    // console.log("Exist >> ", exist);
    if (exist) {
      setError("listSpare", {
        message: "Esta refacción ya existe en la lista",
      });
      return;
    }
    // console.log("data >> ", listSpare);
    dispatch(pushSpareOrder({ ...listSpare, quantity: data.quantity }));
  };
  return (
    <>
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      <br />
      <br />

      <Grid item container xs={12} columnSpacing={2} alignItems="flex-end">
        <Grid item xs={2}>
          <Controller
            control={control}
            name="listSpare"
            render={({ field }) => {
              return (
                <Autocomplete
                  options={
                    isSuccess ? (listSpare as Array<ISpareResponse>) : []
                  }
                  onOpen={() => getSpare({ filter: "", search: "" })}
                  loading={isLoading}
                  value={field.value}
                  getOptionLabel={(option: ISpareResponse) => {
                    return option.description;
                  }}
                  size="small"
                  onChange={(_, n) => {
                    field.onChange(n);
                    if (n) setSpare(n);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Seleccione refacciones"
                      error={!!errors.listSpare}
                      helperText={
                        errors.listSpare && (errors.listSpare.message as string)
                      }
                    />
                  )}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={control}
            name="quantity"
            render={({ field }) => {
              return (
                <TextField
                  placeholder="Cantidad"
                  size="small"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Button endIcon={<Add />} onClick={handleSubmit(saveNewSpare)}>
            Agregar
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            endIcon={<Delete />}
            onClick={deleteAllSpares}
            color="secondary"
          >
            Eliminar Todo
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio refacción</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <CSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              component={TableBody}
            >
              {spares?.map((sp, index) => (
                <TableRow>
                  <TableCell>{sp.description}</TableCell>
                  <TableCell>
                    <TextField
                      defaultValue={sp.suggestedPrice}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      size="small"
                      onChange={(e) => {
                        dispatch(
                          updateSpareOrder({
                            _id: sp._id,
                            price: parseFloat(e.target.value),
                            quantity: sp.quantity,
                          })
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      defaultValue={sp.quantity}
                      size="small"
                      type="number"
                      onChange={(e) => {
                        if (e.target.value)
                          dispatch(
                            updateSpareOrder({
                              _id: sp._id,
                              price: sp.suggestedPrice,
                              quantity: parseFloat(e.target.value),
                            })
                          );
                        else
                          dispatch(
                            updateSpareOrder({
                              _id: sp._id,
                              price: sp.suggestedPrice,
                              quantity: 1,
                            })
                          );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {currencyMx.format(sp.suggestedPrice * sp.quantity)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => deleteSpare(index)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </CSSTransitionGroup>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};
