import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";

const Spinner = () => {
  const open = useSelector((state) => state.spinner.networkProgressDialog);

  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      PaperComponent="div"
      style={{
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <CircularProgress style={{ color: "#E8538F" }} />
    </Dialog>
  );
};

export default React.memo(Spinner);
