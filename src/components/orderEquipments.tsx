import { IEquipmentResponse, IOrderEquipment } from "@/common";
import { Add, Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  IconButton,
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../app/order.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteOrderEquipment, pushOrderEquipment } from "@/redux/slices/order";
import { useConfirm } from "material-ui-confirm";
import CSSTransitionGroup from "react-addons-css-transition-group";
import { v4 } from "uuid";
import { useLazyFindAllEquipmentQuery } from "@/redux/api/equipment.api";

export const OrderEquipments = () => {
  const { equipment, service } = useSelector((store: RootState) => store.order);
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const [
    getEquipments,
    {
      data: dataEquipment,
      isLoading: isLoadingEquipment,
      isSuccess: isSuccessEquipment,
    },
  ] = useLazyFindAllEquipmentQuery();
  const [selectEquipment, setSelectEquipment] = useState<IEquipmentResponse>();
  const {
    register: registerEquipment,
    formState: { errors: errorsEquipment },
    handleSubmit: handleSubmitEquipment,
    reset: resetEquipment,
    setFocus: setFocusEquipment,
  } = useForm<IOrderEquipment>();

  const handleAddDataEquip = (data: IOrderEquipment) => {
    if (!equipment.find((p) => p.serie == data.serie) || data.serie == "") {
      dispatch(
        pushOrderEquipment({
          ...data,
          equipment: selectEquipment as IEquipmentResponse,
          _id: v4(),
        })
      );
      setFocusEquipment("equipment");
      resetEquipment({
        brand: "",
        // equipment: undefined,
        model: "",
        serie: "",
        capacity: "" as any,
      });
    } else
      enqueueSnackbar("Este numero de serie ya existe", { variant: "error" });
  };

  const deleteEquipment = (index: number, _id: string) => {
    confirm({
      description: "Seguro que quieres eliminar el equipo?",
    }).then(() => {
      const exist = service.find((p) => p.equipment._id == _id.toString());
      if (!exist) dispatch(deleteOrderEquipment(_id));
      else
        enqueueSnackbar(
          "Este equipo se usa en los servicios, no se puede eliminar",
          { variant: "error" }
        );
    });
  };

  const deleteAll = () => {
    confirm({
      description:
        "Seguro que desea eliminar todos los equipos?.\n Se eliminaran todos los equipos que no se usan en los servicios.",
    }).then(() => {
      equipment.forEach((eqp) => {
        const exist = service.find((svc) => eqp._id == svc.equipment._id);
        if (!exist) {
          dispatch(deleteOrderEquipment(eqp._id as string));
        }
        null;
      });
    });
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
          <Autocomplete
            onOpen={() => getEquipments()}
            loading={isLoadingEquipment}
            options={isSuccessEquipment && dataEquipment ? dataEquipment : []}
            getOptionLabel={(option) => (option ? option.name : "")}
            size="small"
            onChange={(e, n) => {
              //  field.onChange(n);
              if (n) setSelectEquipment(n);
              //  setFilter(n.filter);
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  {...registerEquipment("equipment", {
                    required: {
                      value: true,
                      message: "Seleccione un equipo",
                    },
                  })}
                  placeholder="Seleccione un equipo *"
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            variant="standard"
            margin="dense"
            label="Marca *"
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
        <Grid item xs={2}>
          <TextField
            variant="standard"
            margin="dense"
            label="Modelo"
            fullWidth
            size="small"
            {...registerEquipment("model", {
              required: {
                value: false,
                message: "El modelo es requerido",
              },
            })}
            error={!!errorsEquipment.model}
            helperText={
              !!errorsEquipment.model && errorsEquipment.model.message
            }
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            variant="standard"
            margin="dense"
            id="apartmentNumber"
            label="Serie"
            fullWidth
            size="small"
            {...registerEquipment("serie", {
              required: {
                value: false,
                message: "La serie es requerida",
              },
            })}
            error={!!errorsEquipment.serie}
            helperText={
              !!errorsEquipment.serie && errorsEquipment.serie.message
            }
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            variant="standard"
            margin="dense"
            label="Capacidad del equipo HP"
            fullWidth
            type="number"
            size="small"
            {...registerEquipment("capacity", {
              required: {
                value: false,
                message: "La capacidad es requerida",
              },
              valueAsNumber: true,
            })}
            error={!!errorsEquipment.capacity}
            helperText={
              !!errorsEquipment.capacity && errorsEquipment.capacity.message
            }
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            endIcon={<Add />}
            onClick={handleSubmitEquipment(handleAddDataEquip)}
          >
            Agregar
          </Button>
          <Button endIcon={<Delete />} onClick={deleteAll} color="secondary">
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
                <TableCell>Equipo</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Serie</TableCell>
                <TableCell>Capacidad del equipo</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <CSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              component={TableBody}
            >
              {equipment?.map((equip, index) => (
                <TableRow>
                  <TableCell>{equip.equipment.name}</TableCell>
                  <TableCell>{equip.brand}</TableCell>
                  <TableCell>{equip.model}</TableCell>
                  <TableCell>{equip.serie}</TableCell>
                  <TableCell>
                    {equip.capacity ? `${equip.capacity} HP` : "------"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        deleteEquipment(index, equip._id as string)
                      }
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
