"use client";
import { IServiceDescriptionRegister } from "@/common";
import { FiltersComponent } from "@/components/fIlters";
import { DialogServiceDescription } from "@/components/serviceDescriptionDialog";
import { ServiceDescriptionTable } from "@/components/serviceDescriptionTable";
import { DialogService } from "@/components/serviceDialog";
import { ServiceTable } from "@/components/serviceTable";
import { saveFiltersService } from "@/redux/slices/service";
import { saveFiltersServiceDescription } from "@/redux/slices/serviceDescription";
import { RootState } from "@/redux/store";
import { Build, HomeRepairService } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Services = () => {
  const { data, filters: filtersSvcDescription } = useSelector(
    (store: RootState) => store.serviceDescription
  );
  const { filters: filtersService } = useSelector(
    (store: RootState) => store.service
  );
  const { formState, register, handleSubmit, clearErrors, control } =
    useForm<IServiceDescriptionRegister>({
      values: data,
    });
  const [value, setValue] = React.useState(0);

  const filtersOptionsService = [
    {
      filter: "status",
      translate: "Estatus",
    },
    {
      filter: "description",
      translate: "Descripción",
    },
    {
      filter: "equipmentCapacity",
      translate: "Capacidad del equipo",
    },
  ];

  const filtersOptionsDescription = [
    {
      filter: "status",
      translate: "Estatus",
    },
    { filter: "description", translate: "Descripción" },
    { filter: "service", translate: "Servicio" },
  ];
  const components = (value: number) => {
    saveFiltersService({ filter: "", search: "" });
    saveFiltersServiceDescription({ filter: "", search: "" });
    switch (value) {
      case 1:
        return (
          <Fragment>
            <FiltersComponent
              filtersOptions={filtersOptionsDescription}
              filters={filtersSvcDescription}
              cb={saveFiltersServiceDescription}
            />

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
            <FiltersComponent
              filtersOptions={filtersOptionsService}
              filters={filtersService}
              cb={saveFiltersService}
            />
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
          label="Tipo de servicio"
          icon={<HomeRepairService />}
        />
        <BottomNavigationAction
          label="Descripción de servicio"
          icon={<Build />}
        />
      </BottomNavigation>
      {components(value)}
    </Box>
  );
};
export default Services;
