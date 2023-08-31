import { OrderDialog } from "@/components/orderDialog";
import { Box } from "@mui/material";
import React from "react";

const Order = () => {
  return (
    <Box sx={{ p: 5 }}>
      <OrderDialog />
    </Box>
  );
};

export default Order;
