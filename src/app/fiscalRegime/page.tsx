"use client";
import { IRegimeRegister } from "@/common";
import { DialogFiscalRegime } from "@/components/fiscalRegimeDialog";
import { FiscalRegimeTable } from "@/components/fiscalRegimeTable";
import { RootState } from "@/redux/store";
import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const FiscalRegime = () => {
  const { data } = useSelector((store: RootState) => store.fiscalRegime);
  const { formState, register, handleSubmit } = useForm<IRegimeRegister>({
    defaultValues: { description: "", key: "" },
    values: {
      ...data,
    },
  });
  return (
    <Box sx={{ p: 5 }}>
      <DialogFiscalRegime
        register={register}
        formState={formState}
        handleSubmit={handleSubmit}
      />
      <FiscalRegimeTable />
    </Box>
  );
};
export default FiscalRegime;
