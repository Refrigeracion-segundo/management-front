"use client";
import { IClientRegister, IClientUpdate } from "@/common";
import { DialogCustomer } from "@/components/customerDialog";
import { CustomerTable } from "@/components/customerTable";
import { FiltersComponent } from "@/components/fIlters";
import { saveFiltersClient } from "@/redux/slices/dialogClient";
import { RootState } from "@/redux/store";
import { Box } from "@mui/material";
import React from "react";
import { UseFormGetValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Clients = () => {
  const { dataClient, filters } = useSelector(
    (store: RootState) => store.dialogClient
  );
  const {
    formState,
    register,
    handleSubmit,
    clearErrors,
    setValue,
    getValues,
    reset,
    control,
  } = useForm<IClientRegister | IClientUpdate>({ values: dataClient });
  const filtersOptions = [
    {
      filter: "status",
      translate: "Estatus",
    },
    {
      filter: "name",
      translate: "Nombre",
    },
    {
      filter: "rfc",
      translate: "RFC",
    },
    {
      filter: "phone",
      translate: "Celular",
    },
  ];
  return (
    <Box sx={{ p: 5 }}>
      <FiltersComponent
        filtersOptions={filtersOptions}
        filters={filters}
        cb={saveFiltersClient}
      />
      <DialogCustomer
        register={register}
        clearErrors={clearErrors}
        formState={formState}
        handleSubmit={handleSubmit}
        getValues={getValues as UseFormGetValues<IClientRegister>}
        reset={reset}
        control={control}
      />
      <CustomerTable />
    </Box>
  );
};
export default Clients;
