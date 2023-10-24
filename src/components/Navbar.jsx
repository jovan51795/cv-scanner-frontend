import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/keycloak";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          CV TAGGING
        </Typography>
        <Button onClick={handleSignOut} size="medium">
          {" "}
          LOGOUT
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
