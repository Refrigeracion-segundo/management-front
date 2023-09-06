"use client";
import { IServiceDescriptionRegister } from "@/common";
import { DialogServiceDescription } from "@/components/serviceDescriptionDialog";
import { ServiceDescriptionTable } from "@/components/serviceDescriptionTable";
import { RootState } from "@/redux/store";
import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const ServiceDescription = () => {
  const { data } = useSelector((store: RootState) => store.serviceDescription);
  const { formState, register, handleSubmit, clearErrors, control } =
    useForm<IServiceDescriptionRegister>({
      values: data,
    });
  return (
    <Box sx={{ p: 5 }}>
      <DialogServiceDescription
        register={register}
        formState={formState}
        handleSubmit={handleSubmit}
        clearErrors={clearErrors}
        control={control}
      />
      <ServiceDescriptionTable />
    </Box>
  );
};
export default ServiceDescription;
