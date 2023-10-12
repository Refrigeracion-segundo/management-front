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

  return (
    <Box sx={{ p: 5 }}>
      <DialogFiscalRegime />
      <FiscalRegimeTable />
    </Box>
  );
};
export default FiscalRegime;
