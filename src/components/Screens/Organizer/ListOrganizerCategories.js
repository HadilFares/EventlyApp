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
import { IconButton, List } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmDialog from "../../Controls/ConfirmDialog";
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

export default function ListOrganizerCategories() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const { user, isLoading } = useAuth();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const openEditForm = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };
  const handleEditSubmit = async (data) => {
    try {
      await editCategory(editingCategory.Id, data);
      setIsFormOpen(false);
      GetOrganizerCategories(user.ID);
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };
  function renderRow(props) {
    const { index, style, data } = props;
    const category = data.categories[index];
    const deleteCategories = data.deleteCategories;
    const itemStyle = {
      ...style,
      borderBottom:
        index < data.categories.length - 1 ? "1px solid #e0e0e0" : "none",
    };
    return (
      <>
        <ListItem style={itemStyle} key={index} component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary={category.Name}
              sx={{ textAlign: "center", fontSize: 30 }}
            />
            <IconButton onClick={() => openEditForm(category)}>
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure to delete this Event?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    deleteCategories(category.Id);
                    setConfirmDialog({
                      isOpen: false,
                    });
                  },
                });
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </ListItemButton>
        </ListItem>
      </>
    );
  }

  const config = {
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const GetOrganizerCategories = async (id) => {
    try {
      console.log("#Id", id);
      const result = await axios.get(
        variables.API_URL + `Category/GetCategoriesByUserId/${id}`,
        config
      );
      console.log(result);

      // Extracting category names from the array of objects
      //  const categoryNames = result.data.map((category) => category.Name);

      const categoryNames = result.data.map((category) => ({
        Id: category.Id,
        Name: category.Name,
      }));
      // Setting the state with the array of category names
      setCategories(categoryNames.reverse());

      console.log("categoriesorg", categoryNames.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategories = async (id) => {
    try {
      console.log("#Id", id);
      await axios.delete(variables.API_URL + `Category/${id}`, config);
      GetOrganizerCategories(user.ID);
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      console.log("#error", error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setNotify({
          isOpen: true,
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };

  const editCategory = async (id, updatedCategory) => {
    console.log("#updatedcat", updatedCategory);
    console.log("#idcat", id);
    try {
      await axios.put(
        variables.API_URL + `Category/${id}`,
        {
          Name: updatedCategory.Name,
          UserId: user.ID,
        },
        config
      );
      GetOrganizerCategories(user.ID);

      // Optionally, show a success notification
      setNotify({
        isOpen: true,
        message: "Category updated successfully",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      // Handle errors, such as showing an error notification
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setNotify({
          isOpen: true,
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };

  const closeModal = () => {
    setOpen(false); // This closes the modalcategory
  };

  useEffect(() => {
    GetOrganizerCategories(user.ID);
  }, []);
  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchQuery]);
  return (
    <>
      <h2>MyCategories</h2>
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
          itemData={{
            categories: filteredCategories,
            deleteCategories,
            editCategory,
          }}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Box>
      {isFormOpen && (
        <Modal
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CategoryForm
              mode="edit"
              editingCategory={editingCategory}
              handleEditSubmit={handleEditSubmit}
            />
          </Box>
        </Modal>
      )}
    </>
  );
}
