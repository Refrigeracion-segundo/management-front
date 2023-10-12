"use client";
import { OrderDialog } from "@/components/orderDialog";
import { OrderFilters } from "@/components/orderFilters";
import { OrderTable } from "@/components/orderTable";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

const Status = () => {
  const { status } = useParams();

  return (
    <Box sx={{ p: 5 }}>
      <OrderFilters status={status ? (status as string) : ""} />
      <OrderDialog />
      <OrderTable />
    </Box>
  );
};

export default Status;
