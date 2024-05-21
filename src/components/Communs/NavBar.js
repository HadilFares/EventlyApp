import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function NavBar() {
  const { signOut, user } = useAuth();
  // let navigate = useNavigate();

  return (
    <AppBar
      position="fixed" // Use 'fixed' or 'sticky' depending on your needs
      sx={{
        left: "-30px", // Adjust this value to move the AppBar to the right
        width: "calc(101% - 0px)", // Adjust the width accordingly to prevent overflow
      }}
    >
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
          display: "flex", // Ensure the toolbar uses flexbox
          justifyContent: "space-between", // keep right padding when drawer closed
        }}
      >
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexFlow: 1 }}
        >
          Dashboard
        </Typography>
        <Button color="inherit" onClick={signOut}>
          LogOut
        </Button>
      </Toolbar>
    </AppBar>
  );
}
