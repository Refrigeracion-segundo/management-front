"use client";
import { ROLES } from "@/common";
import { closeSlider } from "@/redux/slices/slider";
import {
  AccountBalance,
  Build,
  Checklist,
  Construction,
  Diversity3,
  HomeRepairService,
  Person,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

export const ListPermisions = (props: { role: string }) => {
  const { role } = props;
  const dispatch = useDispatch();
  const options = [
    {
      text: "Ordenes",
      icon: <Checklist />,
      redirect: "/order",
      allowedRol: [ROLES.ADMIN, ROLES.USER],
    },
    {
      text: "Servicios",
      icon: <HomeRepairService />,
      redirect: "/services",
      allowedRol: [ROLES.ADMIN, ROLES.USER],
    },
    {
      text: "Descripcion de servicios",
      icon: <Build />,
      redirect: "/serviceDescription",
      allowedRol: [ROLES.ADMIN, ROLES.USER],
    },
    {
      text: "Clientes",
      icon: <Diversity3 />,
      redirect: "/customer",
      allowedRol: [ROLES.ADMIN, ROLES.USER],
    },
    {
      text: "Usuarios",
      icon: <Person />,
      redirect: "/users",
      allowedRol: [ROLES.ADMIN],
    },
    {
      text: "Repuestos",
      icon: <Construction />,
      redirect: "/spare",
      allowedRol: [ROLES.ADMIN, ROLES.USER],
    },
    {
      text: "Regimen fiscal",
      icon: <AccountBalance />,
      redirect: "/fiscalRegime",
      allowedRol: [ROLES.ADMIN, ROLES.USER],
    },
    {
      text: "Equipamiento",
      icon: <Build />,
      redirect: "/equipment",
      allowedRol: [ROLES.ADMIN, ROLES.USER],
    },
  ];
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {options
          .filter((item) => item.allowedRol?.includes(role as any))
          .map((option) => (
            <ListItem key={option.text} disablePadding>
              <Link
                href={option.redirect}
                style={{ width: "100%" }}
                onClick={() => {
                  dispatch(closeSlider());
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};
