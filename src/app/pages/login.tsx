import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@mui/material";
import React from "react";
// import logo from '../assets/logo.png'
import PersonIcon from "@mui/icons-material/Person";
import { Lock } from "@mui/icons-material";
import "@fontsource/roboto/500.css";
export const Login = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      // alignItems="center"
      // justifyItems="center"
      gap={2}
      style={{ backgroundColor: "#2c3338", height: "100vh", width: "100%" }}
    >
      <Grid item xs={5}>
        <Paper style={{ backgroundColor: "transparent" }} elevation={0}>
          <Grid
            container
            gap={1}
            direction="column"
            justifyContent="center"
            alignContent="center"
          >
            <Grid item xs={6}>
              <Typography
                align="center"
                variant="h5"
                style={{ color: "#fff" }}
                gutterBottom
              >
                Inicio de sesión
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                placeholder="Usuario"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon style={{ color: "#fff" }} />
                    </InputAdornment>
                  ),
                  style: { color: "#fff" },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="***********"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock style={{ color: "#fff" }} />
                    </InputAdornment>
                  ),
                  style: { color: "#fff" },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button style={{ float: "right", color: "#fff" }}>
                Iniciar sesión
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
