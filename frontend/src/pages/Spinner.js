import React from "react";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const Spinner = () => {
  const open = useSelector((state) => state.spinner.networkProgressDialog);

  return (
    <Backdrop
      open={open}
      transitionDuration={200}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 2000,
        backgroundColor: "rgba(10, 10, 18, 0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          px: 3,
          py: 2.5,
          borderRadius: "20px",
          background: "linear-gradient(145deg, rgba(31, 31, 43, 0.98) 0%, rgba(22, 22, 34, 0.98) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow:
            "0 24px 48px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(232, 83, 143, 0.12) inset",
        }}
      >
        <Box sx={{ position: "relative", width: 56, height: 56 }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={56}
            thickness={3}
            sx={{
              color: "rgba(232, 83, 143, 0.15)",
              position: "absolute",
              left: 0,
              top: 0,
            }}
          />
          <CircularProgress
            size={56}
            thickness={3}
            disableShrink
            sx={{
              color: "#e8538f",
              position: "absolute",
              left: 0,
              top: 0,
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: "rgba(234, 240, 255, 0.75)",
            letterSpacing: "0.04em",
            fontWeight: 500,
            fontSize: "0.75rem",
            textTransform: "uppercase",
          }}
        >
          Loading
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default React.memo(Spinner);
