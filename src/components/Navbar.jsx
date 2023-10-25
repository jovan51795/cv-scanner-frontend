import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import LogoLight from "../logo-light.png";
import LogoDark from "../logo-dark.png";
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
        <IconButton>
          <img
            src={LogoLight}
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />
        </IconButton>
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
