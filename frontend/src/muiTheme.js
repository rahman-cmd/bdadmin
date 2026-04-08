import { createTheme } from "@mui/material/styles";

/** Dark theme aligned with BD Admin Tailwind palette — no separate CSS file needed */
export const bdAdminMuiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e8538f" },
    secondary: { main: "#ada6f2" },
    background: {
      default: "#0f0f18",
      paper: "#161622",
    },
    text: {
      primary: "#EAF0FF",
      secondary: "#9a9cab",
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.55)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#86c1ed",
        },
      },
    },
  },
});
