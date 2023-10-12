"use client";
import { SlideOptions } from "@/components/slide";
import React, { useEffect } from "react";
import { NavBar } from "./navBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { enqueueSnackbar } from "notistack";
import { viewNotification } from "@/redux/slices/notification";

const Home = () => {
  const { message } = useSelector((store: RootState) => store.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message !== "") {
      enqueueSnackbar(message, {
        variant: "error",
      });
      dispatch(viewNotification(""));
    }
  }, [message]);
  return (
    <div>
      <NavBar />
      <SlideOptions role={"ADMIN"} />
    </div>
  );
};

export default Home;
