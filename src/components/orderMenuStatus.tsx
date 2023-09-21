import { useUpdateStatusMutation } from "@/redux/api";
import { STATUS } from "@/redux/constants";
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
        style={
          { backgroundColor: STATUS.get(status)?.color, color: 'white'}
        }
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
                    onClick={(e) => handleClose(e, "finished")}
                  >
                    Terminado
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
