"use client";
import { IEquipmentRegister } from "@/common";
import { DialogEquipment } from "@/components/equipmentDialog";
import { EquipmentTable } from "@/components/equipmentTable";
import { RootState } from "@/redux/store";
import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Equipment = () => {
  const { data } = useSelector((store: RootState) => store.equipment);
  const { formState, register, handleSubmit } = useForm<IEquipmentRegister>({
    defaultValues: { name: "" },
    values: {
      ...data,
    },
  });
  return (
    <Box sx={{ p: 5 }}>
      <DialogEquipment
        register={register}
        formState={formState}
        handleSubmit={handleSubmit}
      />
      <EquipmentTable />
    </Box>
  );
};
export default Equipment;
