import { useUpdateStatusMutation } from "@/redux/api";
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import React from "react";
const STATUS = new Map<string, { color: string; translate: string }>();

STATUS.set("paid", { color: "#a7414a", translate: "PAGADO" });
STATUS.set("invoiced", { color: "#282726", translate: "FACTURADO" });
STATUS.set("paid and invoiced", {
  color: "#6a8a82",
  translate: "PAGADO Y FACTURADO",
});
STATUS.set("pending", { color: "#a37c27", translate: "PENDIENTE" });
STATUS.set("in progress", { color: "#282726", translate: "EN PROGRESO" });
STATUS.set("canceled", { color: "red", translate: "CANCELADA" });

export const OrderMenuStatus = (props: { _id: string; status: string }) => {
  const { status, _id } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [updateStatus, { isSuccess, isLoading }] = useUpdateStatusMutation();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent, value: string) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    console.log(_id);
    const status = STATUS.get(value);
    status && updateStatus({ _id, status: value });

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        fullWidth
        sx={{ backgroundColor: STATUS.get(status)?.color, color: "#fff" }}
      >
        {STATUS.get(status)?.translate}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        // placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 999, width: "12%" }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
              width: "100%",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={(e) => handleClose(e, "")}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={(e) => handleClose(e, "paid")}>
                    Pagado
                  </MenuItem>
                  <MenuItem onClick={(e) => handleClose(e, "invoiced")}>
                    Facturado
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => handleClose(e, "paid and invoiced")}
                  >
                    Pagado y facturado
                  </MenuItem>

                  <MenuItem onClick={(e) => handleClose(e, "pending")}>
                    Pendiente
                  </MenuItem>

                  <MenuItem onClick={(e) => handleClose(e, "in progress")}>
                    En progreso
                  </MenuItem>
                  <MenuItem onClick={(e) => handleClose(e, "canceled")}>
                    Cancelado
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
