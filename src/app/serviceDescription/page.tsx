"use client";
import { DialogServiceDescription } from "@/components/serviceDescriptionDialog";
import { ServiceDescriptionTable } from "@/components/serviceDescriptionTable";
import { RootState } from "@/redux/store";
import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ServiceDescription = () => {
  const { data } = useSelector((store: RootState) => store.serviceDescription);

  return (
    <Box sx={{ p: 5 }}>
      <DialogServiceDescription />
      <ServiceDescriptionTable />
    </Box>
  );
};
export default ServiceDescription;
