"use client";
import { Divider, Drawer, IconButton, styled } from "@mui/material";
import React, { useState } from "react";
import { ListPermisions } from "./listPermisions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeSlider } from "@/redux/slices/slider";
import { MenuOpen } from "@mui/icons-material";

type Anchor = "top" | "left" | "bottom" | "right";
export const SlideOptions = (props: { role: string }) => {
  const state = useSelector((store: RootState) => store.slider.open);
  const { role } = props;
  const dispatch = useDispatch();
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
    };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  return (
    <div>
      <Drawer anchor="left" open={state} onClose={toggleDrawer("left", false)}>
        <DrawerHeader>
          <IconButton onClick={() => dispatch(closeSlider())}>
            <MenuOpen />
          </IconButton>
        </DrawerHeader>

        <Divider variant="middle" />
        <ListPermisions role={role} />
      </Drawer>
    </div>
  );
};
