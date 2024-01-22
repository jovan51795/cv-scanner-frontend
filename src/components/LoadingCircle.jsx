import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";

export default function LoadingCircle() {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="grey" />
    </Backdrop>
  );
}
