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
import CheckIcon from "@mui/icons-material/Check";
//import ModeEditIcon from "@mui/icons-material/ModeEdit";
const headCells = [
  { id: "", label: "" },
  { id: "UserName", label: "OrganizerUserName" },
  { id: "FirstName", label: "OrganizerFirstName" },
  { id: "Name", label: "Name" },
  { id: "Description", label: "Description" },
  { id: "Type", label: "Type" },
  { id: "Category", label: "Category" },
  { id: "Location", label: "Location" },
  { id: "Status", label: "Status", disableSorting: true },
];

export default function PendingEvents() {
  //const [isLoggedIn, setIsLoggedIn] = useState();
  const [inValidEvents, setinValidEvents] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const { user, isLoading } = useAuth();
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
    useTable(inValidEvents, headCells, filterFn);

  const config = {
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const findnotValidatedEvents = async () => {
    try {
      const result = await axios.get(
        variables.API_URL + "Event/Notvalidated",
        config
      );
      console.log("result2", result.data.reverse());
      setinValidEvents(result.data.reverse());

      console.log("inValidEvents", inValidEvents);
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateEventtStatus = async (id) => {
    console.log("#idaccount", id);
    try {
      await axios.put(
        variables.API_URL + `Event/${id}/validate`,
        {
          id: id,
        },
        config
      );
      findnotValidatedEvents();
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
  const deleteAllEvents = async (id) => {
    try {
      console.log("#Id", id);
      await axios.delete(variables.API_URL + `Event/${id}`, config);
      findnotValidatedEvents();
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
            {row.OrganizerName}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.OrganizerLastName}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.Name}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.Description}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.Type}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.CategoryName}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.Location}
          </TableCell>

          <TableCell
            style={{ borderBottom: "3px solid #878787", borderRadius: "8px" }}
          >
            <Button
              color="primary"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure to validated this event?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    UpdateEventtStatus(row.Id);
                    setConfirmDialog({
                      isOpen: false,
                    });
                  },
                });
              }}

              // onClick={handleOpen}
            >
              <CheckIcon fontSize="small" />
            </Button>

            <Button color="secondary">
              <CloseIcon
                fontSize="small"
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: "Are you sure to canceled this account?",
                    subTitle: "You can't undo this operation",
                    onConfirm: () => {
                      deleteAllEvents(row.Id);
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
      findnotValidatedEvents();
    },
    [],
    [inValidEvents]
  );
  return (
    <div className="outletForm">
      <Content>
        <TblContainer>
          <Table aria-label="collapsible table">
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((row) => (
                <Row key={row.Id} row={row} />
              ))}
            </TableBody>
          </Table>

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
      </Content>
    </div>
  );
}
