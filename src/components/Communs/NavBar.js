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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/*<IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                  >
                      <MenuIcon />
  </IconButton>*/}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Evently
          </Typography>
          <Button color="inherit" onClick={signOut}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
