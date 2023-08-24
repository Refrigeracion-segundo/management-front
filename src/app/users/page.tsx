"use client";
import { IUserRegister, IUserUpdate } from "@/common";
import { DialogUser } from "@/components/userDialog";
import { TableUser } from "@/components/userTable";
import { Box, Divider, Grid, TextField } from "@mui/material";
import React from "react";
import { UseFormGetValues, UseFormSetValue, useForm } from "react-hook-form";

export const Users = () => {
  const {
    formState,
    register,
    handleSubmit,
    clearErrors,
    setValue,
    getValues,
    reset,
  } = useForm<IUserRegister | IUserUpdate>();
  return (
    <div style={{ marginTop: "1%" }}>
      <Divider variant="middle" />
      <Box sx={{ p: 5 }}>
        <DialogUser
          register={register}
          clearErrors={clearErrors}
          formState={formState}
          handleSubmit={handleSubmit}
          getValues={getValues as UseFormGetValues<IUserRegister>}
          reset={reset}
        />
        <TableUser setValue={setValue as UseFormSetValue<IUserUpdate>} />
      </Box>
    </div>
  );
};

export default Users;
