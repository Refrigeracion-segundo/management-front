"use client";
import { IServiceRegister } from "@/common";
import { DialogService } from "@/components/serviceDialog";
import { ServiceTable } from "@/components/serviceTable";
import { RootState } from "@/redux/store";
import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Services = () => {
  const { data } = useSelector((store: RootState) => store.service);

  return (
    <Box sx={{ p: 5 }}>
      <DialogService />
      <ServiceTable />
    </Box>
  );
};
export default Services;
