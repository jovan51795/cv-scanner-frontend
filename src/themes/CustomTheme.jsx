import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CustomTheme = ({ children }) => {
  const customTheme = createTheme({
    palette: {
      background: {
        default: "#222222",
        paper: "#222222",
      },
      mode: "dark",
    },
    typography: {
      fontFamily: "Arial, sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#A12219",
            color: "#fff",
            fontWeight: "bold",
            "&.Mui-selected": {
              backgroundColor: "#ffe5e0",
              color: "#000",
              ":hover": {
                backgroundColor: "#ffe5e0",
                color: "#000",
              },
            },
            ":hover": {
              backgroundColor: "#333333",
              color: "#fff",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "#000",
            boxShadow: "none",
          },
        },
      },
    },
  });

  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
};

export default CustomTheme;
