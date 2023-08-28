"use client";
import { IClientRegister, IClientUpdate } from "@/common";
import { DialogCustomer } from "@/components/customerDialog";
import { CustomerTable } from "@/components/customerTable";
import { RootState } from "@/redux/store";
import { Box } from "@mui/material";
import React, { Fragment } from "react";
import { UseFormGetValues, UseFormSetValue, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Clients = () => {
  const { dataClient } = useSelector((store: RootState) => store.dialogClient);
  const {
    formState,
    register,
    handleSubmit,
    clearErrors,
    setValue,
    getValues,
    reset,
  } = useForm<IClientRegister | IClientUpdate>({ values: dataClient });
  return (
    <Box sx={{ p: 5 }}>
      <DialogCustomer
        register={register}
        clearErrors={clearErrors}
        formState={formState}
        handleSubmit={handleSubmit}
        getValues={getValues as UseFormGetValues<IClientRegister>}
        reset={reset}
      />
      <CustomerTable setValue={setValue as UseFormSetValue<IClientUpdate>} />
    </Box>
  );
};
export default Clients;
