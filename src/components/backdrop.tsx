import { Backdrop, CircularProgress } from "@mui/material";

type HeaderProps = {
  open: boolean;
};

export const CustomBackdrop = ({ open }: HeaderProps) => {
  return (
    <Backdrop sx={{ color: "#1c1c1c", backgroundColor: "#1c1c1c" }} open={open}>
      <CircularProgress size={120} />
    </Backdrop>
  );
};
