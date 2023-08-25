"use client";
import {
  ISpareRegister,
  ISpareUpdate,
  IUserRegister,
  IUserUpdate,
} from "@/common";
import { DialogSpare } from "@/components/spareDialog";
import { TableSpare } from "@/components/tableSpare";
import { Box, Divider } from "@mui/material";
import React from "react";
import { UseFormGetValues, UseFormSetValue, useForm } from "react-hook-form";

export const Spare = () => {
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
  return (
    <div style={{ marginTop: "1%" }}>
      <Divider variant="middle" />
      <Box sx={{ p: 5 }}>
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
