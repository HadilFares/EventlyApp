import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import Modal from "@mui/material/Modal";
import { variables } from "../../../variables";
import controls from "../../Controls/controls";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useAuth } from "../../../context/AuthContext";
import CategoryForm from "./CategoryForm";
import Notification from "../../Controls/Notification";
import Divider from "@mui/material/Divider";
import { Grid, List } from "@mui/material";
import ListOrganizerCategories from "./ListOrganizerCategories";
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    border: "1px solid black", // Add this line to add a border
    borderRadius: "4px", // Optional: Add border radius for a rounded border
    // width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "33.5ch",
    },
  },
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(1),
  //width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "28%",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const style = {
  position: "absolute",
  top: "15%",
  left: "30%",
  width: 500,
  borderRadius: 2,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderColor: "divider",
  p: 4,
};
function renderRow(props) {
  const { index, style, data } = props;
  const category = data[index];
  const itemStyle = {
    ...style,
    borderBottom: index < data.length - 1 ? "1px solid #e0e0e0" : "none",
  };
  return (
    <>
      <ListItem style={itemStyle} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText
            primary={category}
            sx={{ textAlign: "center", fontSize: 30 }}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default function Categories() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const { user, isLoading } = useAuth();

  const config = {
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const GetCategories = async () => {
    try {
      const result = await axios.get(
        variables.API_URL + "Category/GetAllNamesCategories",
        config
      );
      setCategories(result.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  const closeModal = () => {
    setOpen(false); // This closes the modalcategory
  };
  const AddCategory = async (data) => {
    console.log("#dataAddcategory", data.Name);
    try {
      const Response = await axios.post(
        variables.API_URL + "Category",
        {
          Name: data.Name,
          UserId: user.ID,
        },
        config
      );
      console.log("#Response", Response.status);
      if (Response.data) {
        setNotify({
          isOpen: true,
          message: "Submitted Successfully",
          type: "success",
        });
        console.log("notif");
        closeModal();
        GetCategories();
      }
    } catch (error) {
      console.log(error.response.data.message);
      // Handle 409 Conflict
      setNotify({
        isOpen: true,
        message: "A category with the same name already exists.",
        type: "error",
      });
    }
  };
  useEffect(() => {
    GetCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchQuery]);

  return (
    <Grid container spacing={2}>
      <Grid xs={8}>
        <Box display="flex" alignItems="center">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={(e) => setSearchQuery(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <div>
            <Box sx={{ marginLeft: 3 }}>
              {" "}
              {/* Adjust the marginLeft value as needed */}
              <controls.Button
                text="Add Category"
                onClick={handleOpen}
              ></controls.Button>
            </Box>

            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <CategoryForm mode="add" AddCategory={AddCategory} />
              </Box>
            </Modal>
            <Notification
              notify={notify}
              setNotify={setNotify}
              vertical="top"
              horizontal="right"
            />
          </div>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: 400,
            maxWidth: 360,
            bgcolor: "background.paper",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <FixedSizeList
            height={400}
            width={360}
            itemSize={50}
            itemCount={filteredCategories.length}
            itemData={filteredCategories}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        </Box>
      </Grid>
    </Grid>
  );
}
