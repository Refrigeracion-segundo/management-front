"use client";
import { ROLES } from "@/common";
import {
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

export const ListPermisions = (props: { role: string }) => {
  const { role } = props;
  const options = [
    {
      text: "Servicios",
      icon: <HomeRepairService />,
      redirect: "/lol",
      allowedRol: [ROLES.ADMIN, ROLES.USER],
    },
    {
      text: "Clientes",
      icon: <Diversity3 />,
      redirect: "/lol",
      allowedRol: [ROLES.ADMIN, ROLES.USER],
    },
    {
      text: "Usuarios",
      icon: <Person />,
      redirect: "/users",
      allowedRol: [ROLES.ADMIN],
    },
    {
      text: "Ordenes",
      icon: <Checklist />,
      redirect: "/home/contain",
      allowedRol: [ROLES.ADMIN, ROLES.USER],
    },
    {
      text: "Materiales",
      icon: <Construction />,
      redirect: "/home/contain",
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
              <Link href={option.redirect} style={{ width: "100%" }}>
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
