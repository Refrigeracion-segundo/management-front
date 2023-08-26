"use client";
import { IServiceRegister } from "@/common";
import { DialogService } from "@/components/serviceDialog";
import { RootState } from "@/redux/store";
import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Services = () => {
  const { data } = useSelector((store: RootState) => store.service);
  const { formState, register, handleSubmit, clearErrors } =
    useForm<IServiceRegister>({
      defaultValues: { ...data },
      values: {
        ...data,
      },
    });
  return (
    <Box sx={{ p: 5 }}>
      <DialogService
        register={register}
        formState={formState}
        handleSubmit={handleSubmit}
        clearErrors={clearErrors}
      />
    </Box>
  );
};
export default Services;
