"use client";
import { IServiceDescriptionRegister } from "@/common";
import { DialogServiceDescription } from "@/components/serviceDescriptionDialog";
import { ServiceDescriptionTable } from "@/components/serviceDescriptionTable";
import { DialogService } from "@/components/serviceDialog";
import { ServiceTable } from "@/components/serviceTable";
import { RootState } from "@/redux/store";
import { Build, HomeRepairService } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Services = () => {
  const { data } = useSelector((store: RootState) => store.serviceDescription);
  const { formState, register, handleSubmit, clearErrors, control } =
    useForm<IServiceDescriptionRegister>({
      values: data,
    });
  const [value, setValue] = React.useState(0);

  const components = (value: number) => {
    switch (value) {
      case 1:
        return (
          <Fragment>
          <DialogServiceDescription
            register={register}
            formState={formState}
            handleSubmit={handleSubmit}
            clearErrors={clearErrors}
            control={control}
          />
          <ServiceDescriptionTable />
        </Fragment>
        );
      case 0:
        return (
          <Fragment>
          <DialogService />
          <ServiceTable />
        </Fragment>
        );
    }
  };
  return (
    <Box sx={{ p: 5 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Categorías de servicios"
          icon={<HomeRepairService />}
        />
        <BottomNavigationAction
          label="Descripción de servicios"
          icon={<Build />}
        />
      </BottomNavigation>
      {components(value)}
    </Box>
  );
};
export default Services;
