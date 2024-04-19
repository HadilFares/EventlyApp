import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import Popup from "../../Controls/PopUp";
import { variables } from "../../../variables";
import { Button, makeStyles } from "@material-ui/core";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useTable from "../../Communs/useTable";
import UsersForm from "./../../Communs/UsersForm";
import ConfirmDialog from "../../Controls/ConfirmDialog";
import Notification from "../../Controls/Notification";
import Content from "../../Communs/Content";
import controls from "../../Controls/controls";
import { useAuth } from "../../../context/AuthContext";
//import ModeEditIcon from "@mui/icons-material/ModeEdit";
const headCells = [
  { id: "", label: "" },
  { id: "UserName", label: "UserName" },
  { id: "FirstName", label: "FirstName" },
  { id: "LastName", label: "LastName" },
  { id: "Email", label: "Email" },
  { id: "PhoneNumber", label: "PhoneNumber" },
  { id: "Role", label: "Role" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function QuizMasters() {
  //const [isLoggedIn, setIsLoggedIn] = useState();
  const [Users, setUsers] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const { user, isLoading } = useAuth();

  const [selectedRole, setSelectedRole] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(Users, headCells, filterFn);

  const config = {
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const findUsers = async () => {
    console.log("test");
    try {
      console.log("hello");
      const result = await axios.get(
        variables.API_URL + "User/AllUsers",
        config
      );
      console.log("result2", result.data.reverse());
      setUsers(result.data.reverse());

      console.log("Users", Users);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUsers = async (id) => {
    try {
      console.log("#Id", id);
      await axios.delete(variables.API_URL + `User/${id}`, config);
      findUsers();
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

  const addOrEdit = async (userInfo, resetForm) => {
    console.log("#userinfo", userInfo);
    if (userInfo.Id == 0) {
      try {
        const { data } = await axios.post(
          variables.API_URL + "User/CreateUser",
          {
            FirstName: userInfo.FirstName,
            LastName: userInfo.LastName,
            Username: userInfo.Username,
            Email: userInfo.Email,
            Password: userInfo.Password,
            PhoneNumber: userInfo.PhoneNumber,
            Role: userInfo.Role,
          },
          config
        );
        console.log("UserInfoCreate", userInfo);
        if (data) {
          setNotify({
            isOpen: true,
            message: "Submitted Successfully",
            type: "success",
          });
        }
      } catch (error) {
        //  setloading(false);
        console.log(error.response.data.message);
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
    } else if (recordForEdit) {
      console.log("#recordFordit", recordForEdit);
      console.log("#kdcfvj", recordForEdit.Id);
      await axios
        .put(
          variables.API_URL + `User/${recordForEdit.Id}`,
          {
            Id: recordForEdit.Id,
            FirstName: userInfo.FirstName,
            LastName: userInfo.LastName,
            Username: userInfo.Username,
            Email: userInfo.Email,
            Password: userInfo.Password,
            PhoneNumber: userInfo.PhoneNumber,
            Role: userInfo.Role,
          },
          config
        )
        .then((res) => console.log(res));
      console.log("#kdcfvj", recordForEdit.Id);
    }

    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    findUsers();
  };
  const openInPopup = (item) => {
    console.log("#item", item);
    setRecordForEdit({ ...item });

    setOpenPopup(true);
  };
  console.log("#record", recordForEdit);
  function Row(props) {
    const { row } = props;
    console.log("#Row", row);
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow>
          <TableCell
            style={{
              borderBottom: "3px solid #878787",
              borderBottomLeftRadius: "20%",
            }}
          >
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>

          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.Username}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.FirstName}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.LastName}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.Email}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.PhoneNumber}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.Role}
          </TableCell>
          <TableCell
            style={{ borderBottom: "3px solid #878787", borderRadius: "8px" }}
          >
            <Button
              color="primary"
              onClick={() => {
                openInPopup(row);
              }}

              // onClick={handleOpen}
            >
              <EditIcon fontSize="small" />
            </Button>

            <Button color="secondary">
              <CloseIcon
                fontSize="small"
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: "Are you sure to delete this record?",
                    subTitle: "You can't undo this operation",
                    onConfirm: () => {
                      deleteUsers(row.Id);
                      setConfirmDialog({
                        isOpen: false,
                      });
                    },
                  });
                }}
              />
            </Button>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  useEffect(
    () => {
      findUsers();
    },
    [],
    [Users]
  );
  return (
    <div className="outletForm">
      <Content>
        <TblContainer>
          <Table aria-label="collapsible table">
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
          <Popup
            title=" Users Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <UsersForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
          </Popup>

          <Notification
            notify={notify}
            setNotify={setNotify}
            vertical="top"
            horizontal="right"
          />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </TblContainer>
        <TblPagination />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <controls.Button
            text="Add New"
            color="#1D1D1D"
            starticon={<AddIcon />}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </div>
      </Content>
    </div>
  );
}
