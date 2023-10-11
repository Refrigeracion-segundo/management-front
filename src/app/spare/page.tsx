"use client";
import {
  ISpareRegister,
  ISpareUpdate,
} from "@/common";
import { DialogSpare } from "@/components/spareDialog";
import { FiltersComponent } from "@/components/spareFIlters";
import { TableSpare } from "@/components/tableSpare";
import { saveSpareFilters } from "@/redux/slices/dialogSpare";
import { RootState } from "@/redux/store";
import { Box, Divider } from "@mui/material";
import React from "react";
import { UseFormGetValues, UseFormSetValue, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Spare = () => {
  const {
    formState,
    register,
    handleSubmit,
    clearErrors,
    setValue,
    getValues,
    reset,
  } = useForm<ISpareRegister | ISpareUpdate>({
    defaultValues: { description: "", suggestedPrice: 0 },
  });
  const { filters } = useSelector((store: RootState) => store.dialogSpare);

  const filtersOptions = [
    { filter: "status", translate: "Estatus" },
    { filter: "description", translate: "Descripción" },
    { filter: "suggestedPrice", translate: "Precio sugerido" },
  ];

  return (
    <div style={{ marginTop: "1%" }}>
      <Divider variant="middle" />
      <Box sx={{ p: 5 }}>
      <FiltersComponent filtersOptions={filtersOptions} filters={filters} cb={saveSpareFilters} />
        <DialogSpare
          register={register}
          clearErrors={clearErrors}
          formState={formState}
          handleSubmit={handleSubmit}
          getValues={getValues as UseFormGetValues<ISpareRegister>}
          reset={reset}
        />
        <TableSpare setValue={setValue as UseFormSetValue<ISpareUpdate>} />
      </Box>
    </div>
  );
};

export default Spare;
