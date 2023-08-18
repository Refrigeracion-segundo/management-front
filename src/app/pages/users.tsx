"use client";
import { DialogUser } from "@/components/dialogUser";
import { TableUser } from "@/components/tableUser";
import { Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export const Users = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();
  return (
    <div>
      <DialogUser />
      <TableUser />
    </div>
  );
};
