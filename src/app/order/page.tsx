import { OrderDialog } from "@/components/orderDialog";
import { OrderFilters } from "@/components/orderFilters";
import { OrderTable } from "@/components/orderTable";
import { Box } from "@mui/material";
import React from "react";

const Order = () => {
  return (
    <Box sx={{ p: 5 }}>
      <OrderFilters />
      <OrderDialog />
      <OrderTable />
    </Box>
  );
};

export default Order;
