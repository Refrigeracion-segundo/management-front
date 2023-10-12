"use client";
import { IUserRegister, IUserUpdate } from "@/common";
import { FiltersComponent } from "@/components/fIlters";
import { DialogUser } from "@/components/userDialog";
import { TableUser } from "@/components/userTable";
import { saveUserFilters } from "@/redux/slices/dialogUser";
import { RootState } from "@/redux/store";
import { Box, Divider } from "@mui/material";
import React from "react";
import { UseFormGetValues, UseFormSetValue, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Users = () => {
  const { user } = useSelector((store: RootState) => store.dialogUser);
  const {
    formState,
    register,
    handleSubmit,
    clearErrors,
    setValue,
    getValues,
    reset,
  } = useForm<IUserRegister | IUserUpdate>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roles: [],
    },
    values: user,
  });
  const { filters } = useSelector((store: RootState) => store.dialogUser);

  const filtersOptions = [
    { filter: "user", translate: "Usuario" },
    { filter: "Email", translate: "Email" },
    { filter: "status", translate: "Estatus" },
  ];

  return (
    <div style={{ marginTop: "1%" }}>
      <Divider variant="middle" />
      <Box sx={{ p: 5 }}>
      <FiltersComponent filtersOptions={filtersOptions} filters={filters} cb={saveUserFilters} />
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
