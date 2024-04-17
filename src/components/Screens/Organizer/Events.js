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
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Popup from "../../Controls/PopUp";
import { variables } from "../../../variables";
import { Button, makeStyles } from "@material-ui/core";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useTable from "../../Communs/useTable";
import ConfirmDialog from "../../Controls/ConfirmDialog";
import Notification from "../../Controls/Notification";
import Content from "../../Communs/Content";
import controls from "../../Controls/controls";
import { useAuth } from "../../../context/AuthContext";
import EventsForm from "./EventsForm";
//import ModeEditIcon from "@mui/icons-material/ModeEdit";
const headCells = [
  { id: "", label: "" },
  { id: "Name", label: "Name" },
  { id: "Description", label: "Description" },
  { id: "Category", label: "Category" },
  { id: "StartDate", label: "StartDate" },
  { id: "EndDate", label: "EndDate" },
  { id: "StartTime", label: "StartTime" },
  { id: "EndTime", label: "EndTime" },
  { id: "Location", label: "Location" },
  { id: "Price", label: "Price" },
  { id: "NbStand", label: "NbStand" },

  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Events() {
  //const [isLoggedIn, setIsLoggedIn] = useState();
  const [AllEvents, setAllEvents] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [Categories, setCategories] = useState([]);
  const { user, isLoading } = useAuth();
  // console.log("userAuth", user.ID);
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
    useTable(AllEvents, headCells, filterFn);

  const config = {
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  /* const findAllEvents = async () => {
    console.log("test");
    try {
      console.log("hello");
      const result = await axios.get(
        variables.API_URL + "Event/GetAllEvents",
        config
      );
      const formattedEvents = result.data.reverse().map((event) => ({
        ...event,
        StartDate: new Date(event.StartDate).toLocaleDateString(),
        EndDate: new Date(event.EndDate).toLocaleDateString(),
        StartTime: new Date(event.StartTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        EndTime: new Date(event.EndTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      console.log("result2", result.data.reverse());
      console.log("formattedEvents", formattedEvents);
      setAllEvents(formattedEvents);

      console.log("AllEvents", AllEvents);
    } catch (error) {
      console.log(error);
    }
  };
*/
  const findAllEvents = async () => {
    try {
      const result = await axios.get(
        variables.API_URL + "Event/GetAllEvents",
        config
      );
      const formattedEvents = result.data.reverse().map((event) => {
        const startDate = new Date(event.StartDate).toLocaleDateString();
        const endDate = new Date(event.EndDate).toLocaleDateString();
        // Split the StartTime string into hours, minutes, and seconds
        const startTimeComponents = event.StartTime.split(":");
        const startHour = parseInt(startTimeComponents[0]);
        const startMinute = parseInt(startTimeComponents[1]);
        const EndTimeComponents = event.EndTime.split(":");
        const EndHour = parseInt(EndTimeComponents[0]);
        const EndMinute = parseInt(EndTimeComponents[1]);
        // Create a new Date object with the extracted hour and minute components
        const startTime = new Date();
        const EndTime = new Date();
        startTime.setHours(startHour, startMinute);
        EndTime.setHours(EndHour, EndMinute);
        return {
          ...event,
          StartDate: startDate,
          EndDate: endDate,
          StartTime: startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          EndTime: EndTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
      setAllEvents(formattedEvents);
      console.log("#formatedevents", formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };
  const findCategories = async () => {
    console.log("test");
    try {
      // console.log("hellocateg");
      const result = await axios.get(
        variables.API_URL + "Category/GetAllCategories",
        config
      );
      console.log("resultCategories", result.data.reverse());
      setCategories(result.data.reverse());

      console.log("Categories", Categories);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllEvents = async (id) => {
    try {
      console.log("#Id", id);
      await axios.delete(variables.API_URL + `Event/${id}`, config);
      findAllEvents();
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
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (adding 1 since it's zero-based) and pad with leading zero if needed
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if needed
    const year = date.getFullYear(); // Get year
    return `${month}/${day}/${year}`;
  }

  const addOrEdit = async (EventInfo, resetForm) => {
    console.log("#Eventinfo", EventInfo);
    if (EventInfo.Id == 0) {
      try {
        const { data } = await axios.post(
          variables.API_URL + "Event",
          {
            Name: EventInfo.Name,
            Description: EventInfo.Description,
            StartDate: EventInfo.StartDate,
            EndDate: EventInfo.EndDate,
            StartTime: EventInfo.StartTime,
            EndTime: EventInfo.EndTime,
            Type: EventInfo.Type,
            Location: EventInfo.Location,
            Price: EventInfo.Price,
            NbStand: EventInfo.NbStand,
            OrganizerId: user.ID,
            CategoryName: EventInfo.CategoryName,
          },
          config
        );
        console.log("EventInfoCreate", EventInfo);
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
          variables.API_URL + `Event/${recordForEdit.Id}`,
          {
            Name: EventInfo.Name,
            Description: EventInfo.Description,
            StartDate: formatDate(EventInfo.StartDate),
            EndDate: formatDate(EventInfo.EndDate),
            StartTime: EventInfo.StartTime,
            EndTime: EventInfo.EndTime,
            Type: EventInfo.Type,
            Location: EventInfo.Location,
            Price: EventInfo.Price,
            NbStand: EventInfo.NbStand,
            OrganizerId: user.ID,
            CategoryName: EventInfo.CategoryName,
          },
          config
        )
        .then((res) => console.log(res));
      console.log("#kdcfvj", recordForEdit.Id);
    }

    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    findAllEvents();
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
            {row.Name}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.Description}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.CategoryName}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.StartDate}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.EndDate}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.StartTime}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.EndTime}
          </TableCell>{" "}
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.Location}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.Price}
          </TableCell>
          <TableCell align="left" style={{ borderBottom: "3px solid #878787" }}>
            {row.NbStand}
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
                    title: "Are you sure to delete this Event?",
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
      findAllEvents();
      findCategories();
    },
    [],
    [AllEvents],
    [Categories]
  );
  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
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
              <Popup
                title="Events Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              >
                <EventsForm
                  recordForEdit={recordForEdit}
                  addOrEdit={addOrEdit}
                  Categories={Categories}
                />
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
                startIcon={<AddIcon />}
                onClick={() => {
                  setOpenPopup(true);
                  setRecordForEdit(null);
                }}
              />
            </div>
          </Content>
        </div>
      )}
    </>
  );
}
