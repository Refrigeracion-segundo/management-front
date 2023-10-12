"use client";
import { IEquipmentRegister } from "@/common";
import { DialogEquipment } from "@/components/equipmentDialog";
import { EquipmentTable } from "@/components/equipmentTable";
import { FiltersComponent } from "@/components/fIlters";
import { saveEquipmentFilters } from "@/redux/slices/dialogEquipment";
import { RootState } from "@/redux/store";
import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Equipment = () => {
  // const { data } = useSelector((store: RootState) => store.equipment);

  const { filters } = useSelector((store: RootState) => store.equipment);

  const filtersOptions = [
    { filter: "name", translate: "Nombre" },
    { filter: "status", translate: "Estatus" },
  ];

  return (
    <Box sx={{ p: 5 }}>
      <FiltersComponent
        filtersOptions={filtersOptions}
        filters={filters}
        cb={saveEquipmentFilters}
      />
      <DialogEquipment />
      <EquipmentTable />
    </Box>
  );
};
export default Equipment;
