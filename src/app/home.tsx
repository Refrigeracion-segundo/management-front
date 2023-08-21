"use client";
import { SlideOptions } from "@/components/slide";
import Head from "next/head";
import React from "react";
import { NavBar } from "./navBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <SlideOptions role={"ADMIN"} />
    </div>
  );
};

export default Home;
