"use client";
import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Lock } from "@mui/icons-material";
import "@fontsource/roboto/500.css";
import { useForm } from "react-hook-form";
import { IFormLogin, ILogin } from "@/common";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/api";

export const Login = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IFormLogin>();
  const router = useRouter();
  const [login, { isSuccess }] = useLoginMutation();
  const loginUser = (data: ILogin) => {
    login(data)
      .unwrap()
      .then(() => {
        window.location.reload();
      });
    // localStorage.setItem("user", JSON.stringify(data));
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      gap={2}
      style={{ height: "100vh", width: "100%" }}
    >
      <Grid item xs={5}>
        <Paper elevation={0}>
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
                {...register("email", {
                  required: {
                    value: true,
                    message: "Ingrese un usuario valido",
                  },
                  setValueAs: (value: string) => value.toLowerCase().trim(),
                })}
                helperText={!!errors.email && errors.email.message}
                error={!!errors.email}
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
                {...register("password", {
                  required: {
                    value: true,
                    message: "Ingrese un usuario valido",
                  },
                  setValueAs: (value: string) => value.trim(),
                })}
                helperText={!!errors.password && errors.password.message}
                error={!!errors.password}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ float: "right", color: "#fff" }}
                onClick={handleSubmit(loginUser)}
              >
                Iniciar sesión
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
