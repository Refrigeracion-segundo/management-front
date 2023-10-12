"use client";
import { openSlider } from "@/redux/slices/slider";
import { RootState } from "@/redux/store";
import { ArrowDropDown, Menu as MenuIcon } from "@mui/icons-material";
import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { path } = useSelector((store: RootState) => store.generalApp);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const user = JSON.parse(localStorage.getItem("user") || "{}").user;
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <Grid container spacing={1} style={{ marginTop: "1%" }} alignItems="center">
      <Grid item xs={1}>
        <IconButton
          style={{ marginLeft: "30%" }}
          onClick={() => dispatch(openSlider())}
        >
          <MenuIcon />
        </IconButton>
      </Grid>
      <Grid item xs={7}>
        <Typography>Refrigeración segunda / {path}</Typography>
      </Grid>
      <Grid
        item
        container
        xs={4}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Avatar sx={{ bgcolor: blue["A400"] }}>
            {user.name[0].toUpperCase()}
            {user.lastName[0].toUpperCase()}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography>
            {user.name.toUpperCase()} {user.lastName.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleClick}>
            <ArrowDropDown />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Cerrar sesion</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
};
