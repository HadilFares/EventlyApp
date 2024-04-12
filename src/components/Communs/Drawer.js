import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom"; // Import Link from React Router
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { useAuth } from "../../context/AuthContext";
import NavBar from "./NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CategoryIcon from "@mui/icons-material/Category";
import Container from "@mui/material/Container";
import { Category } from "@mui/icons-material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function CustomDrawer({ children }) {
  const { signOut, user } = useAuth();
  // let navigate = useNavigate();
  const defaultTheme = createTheme();
  const [open, setOpen] = React.useState(true);

  const adminIcons = [
    <PeopleAltIcon />,
    <AccountBoxIcon />,
    <CelebrationIcon />,
  ];
  const userIcons = [<CategoryIcon />, <CelebrationIcon />];

  // Mapping between item names and page paths
  const pagePaths = {
    Users: "admin/users",
    PendingAccounts: "admin/pending-Account",
    Events: "admin/events",
    AllEvents: "organizer/events",
    Categories: "organizer/categories",
  };

  const items = user?.Roles.includes("Admin")
    ? ["Users", "PendingAccounts", "Events"]
    : ["AllEvents", "Categories"];

  const DrawerList = (
    <Box sx={{ display: "flex" }} marginRight={"40px"}>
      {" "}
      <CssBaseline />
      <NavBar />
      <Toolbar />
      <Box sx={{ overflow: "auto", marginTop: "80px", marginLeft: "-20px" }}>
        <List component="nav">
          {items.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={pagePaths[text]}>
                <ListItemIcon>
                  {user?.Roles.includes("Admin")
                    ? adminIcons[index]
                    : userIcons[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
    </Box>
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      {user?.ISAuthenticated && (
        <>
          <Drawer variant="permanent" open={open}>
            {DrawerList}
          </Drawer>
        </>
      )}
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
