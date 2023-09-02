import { IOrderEquipment } from "@/common";
import { Add } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../app/order.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { pushOrderEquipment } from "@/redux/slices/order";
export const OrderEquipments = () => {
  const { equipment } = useSelector((store: RootState) => store.order);
  const dispatch = useDispatch();
  const {
    register: registerEquipment,
    formState: { errors: errorsEquipment },
    handleSubmit: handleSubmitEquipment,
    reset: resetEquipment,
    setFocus: setFocusEquipment,
  } = useForm<IOrderEquipment>();

  const handleAddDataEquip = (data: IOrderEquipment) => {
    if (!equipment.find((p) => p.serie == data.serie)) {
      dispatch(pushOrderEquipment(data));
      setFocusEquipment("equipment");
      resetEquipment({
        brand: "",
        equipment: "",
        model: "",
        serie: "",
      });
    } else
      enqueueSnackbar("Este numero de serie ya existe", { variant: "error" });
  };
  return (
    <>
      <br />
      <br />
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>

      <Grid item container xs={12} columnSpacing={2} alignItems="flex-end">
        <Grid item xs={2}>
          <TextField
            variant="standard"
            margin="dense"
            label="Equipo"
            fullWidth
            size="small"
            {...registerEquipment("equipment", {
              required: {
                value: true,
                message: "El nombre del equipo es requerido",
              },
            })}
            error={!!errorsEquipment.equipment}
            helperText={
              !!errorsEquipment.equipment && errorsEquipment.equipment.message
            }
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="standard"
            margin="dense"
            label="Marca"
            fullWidth
            size="small"
            {...registerEquipment("brand", {
              required: {
                value: true,
                message: "La marca es requerida",
              },
            })}
            error={!!errorsEquipment.brand}
            helperText={
              !!errorsEquipment.brand && errorsEquipment.brand.message
            }
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="standard"
            margin="dense"
            label="Modelo"
            fullWidth
            size="small"
            {...registerEquipment("model", {
              required: {
                value: true,
                message: "El modelo es requerido",
              },
            })}
            error={!!errorsEquipment.model}
            helperText={
              !!errorsEquipment.model && errorsEquipment.model.message
            }
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="standard"
            margin="dense"
            id="apartmentNumber"
            label="Serie"
            fullWidth
            size="small"
            {...registerEquipment("serie", {
              required: {
                value: true,
                message: "La serie es requerida",
              },
            })}
            error={!!errorsEquipment.serie}
            helperText={
              !!errorsEquipment.serie && errorsEquipment.serie.message
            }
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            endIcon={<Add />}
            onClick={handleSubmitEquipment(handleAddDataEquip)}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Equipo</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Serie</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TransitionGroup component={null}>
                {equipment?.map((equip, index) => (
                  <CSSTransition key={index} timeout={500} classNames="fade">
                    <TableRow>
                      <TableCell>{equip.equipment}</TableCell>
                      <TableCell>{equip.brand}</TableCell>
                      <TableCell>{equip.model}</TableCell>
                      <TableCell>{equip.serie}</TableCell>
                    </TableRow>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};
