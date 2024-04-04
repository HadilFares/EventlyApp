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

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { useAuth } from "../../context/AuthContext";
import NavBar from "./NavBar";

export default function CustomDrawer({ children }) {
  const { signOut, user } = useAuth();
  // let navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const role = localStorage.getItem("Roles");

  const adminIcons = [
    <PeopleAltIcon />,
    <AccountBoxIcon />,
    <CelebrationIcon />,
  ];
  const userIcons = [<PeopleAltIcon />];

  // Mapping between item names and page paths
  const pagePaths = {
    Users: "/users",
    PendingAccounts: "/pending-accounts",
    Events: "/events",
  };

  const items =
    role === "admin" ? ["Users", "PendingAccounts", "Events"] : ["Users"];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {items.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={pagePaths[text]}>
              <ListItemIcon>
                {role === "admin" ? adminIcons[index] : userIcons[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {user?.Token && (
        <>
          <NavBar />
          <Drawer open={open}>{DrawerList}</Drawer>
        </>
      )}
      {children}
    </div>
  );
}
