import React, { useState } from "react";
import "./Ticket.css";
import axios from "axios";
import { variables } from "../../../variables";
import { useLocation, useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PaidIcon from "@mui/icons-material/Paid";
import controls from "../../Controls/controls";
import Modal from "@mui/material/Modal";
import Form from "./Form.css";
import { Box } from "@mui/material";
import TicketForm from "./TicketForm";
import Popup from "../../Controls/PopUp";
import ConfirmDialog from "../../Controls/ConfirmDialog";
import Notification from "../../Controls/Notification";
const style = {
  position: "absolute",
  top: "5%",
  left: "30%",
  width: 550,
  borderRadius: 2,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderColor: "divider",
  p: 4,
};
const TicketPopup = () => {
  const location = useLocation();
  const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [ticketInfo, setTicketInfo] = useState(location.state?.ticketInfo);
  const handleOpenPopUp = () => setOpenPopup(true);
  const handleClosePopUp = () => setOpenPopup(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  let navigate = useNavigate();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  //const ticketInfo =;
  console.log("TicketInfoPop", ticketInfo);
  const startDate = new Date(ticketInfo.StartDate);
  //const formattedDate = startDate.toISOString().slice(0, 10);
  const formattedDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const EndDate = new Date(ticketInfo.EndDate);
  const formattedEndDate = EndDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  function convertTo12HourFormat(time24) {
    const [hour, minute, second] = time24.split(":").map(Number);
    let period = "AM";
    let hour12 = hour;

    if (hour >= 12) {
      period = "PM";
      if (hour > 12) {
        hour12 = hour - 12;
      }
    }

    if (hour12 === 0) {
      hour12 = 12; // 0 hour in 12-hour format is 12 AM
    }

    return `${hour12.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}${period}`;
  }
  const config = {
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const StartTime = convertTo12HourFormat(ticketInfo.StartTime);
  const EndTime = convertTo12HourFormat(ticketInfo.EndTime);

  const DeleteTicket = async (id) => {
    console.log("getticketedit", id);
    try {
      const result = await axios.delete(
        variables.API_URL + `Ticket/${id}`,
        config
      );
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
      });
      navigate("/organizer/events");
    } catch (error) {
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

  const GetTicket = async (id) => {
    console.log("getticketedit", id);
    try {
      const result = await axios.get(
        variables.API_URL + `Ticket/GetTicket/${id}`,
        config
      );
      console.log("resultticketgetafteredit", result);
      setTicketInfo(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSuccess = async (updatedTicketInfo) => {
    console.log("#updatedticket", updatedTicketInfo);
    // Assuming updatedTicketInfo is the updated ticket information returned from the edit operation
    setTicketInfo(updatedTicketInfo);
    // Optionally, fetch the updated ticket information from the backend
    await GetTicket(updatedTicketInfo.Id);
  };

  return (
    <div>
      {" "}
      {/* Adjust the marginLeft value as needed */}
      <Box sx={{ marginLeft: 3 }}>
        <controls.Button
          text="Edit Ticket"
          onClick={handleOpenPopUp}
        ></controls.Button>
        <controls.Button
          text="Delete Ticket"
          color="secondary"
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: "Are you sure to delete this Ticket?",
              subTitle: "You can't undo this operation",
              onConfirm: () => {
                DeleteTicket(ticketInfo.Id);
                setConfirmDialog({
                  isOpen: false,
                });
              },
            });
          }}
        ></controls.Button>
      </Box>
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
      {ticketInfo && (
        <Popup
          title={"Ticket Form"}
          setOpenPopup={setOpenPopup}
          openPopup={openPopup}
        >
          <TicketForm
            mode="edit"
            TicketInfo={ticketInfo}
            setOpenPopup={setOpenPopup}
            onEditSuccess={handleEditSuccess}
          />
        </Popup>
      )}
      <div>
        <div class="container">
          <div class="item">
            <div class="item-right">
              <span class="up-border"></span>
              <span class="down-border"></span>
            </div>
            <div class="item-left">
              <h2 class="title" style={{ color: ticketInfo.Ticketcolor }}>
                {ticketInfo.Name}
              </h2>
              <div class="sce">
                <div class="icon">
                  <DateRangeIcon />
                </div>
                <p>
                  {formattedDate} - {formattedEndDate}
                  <br /> {StartTime} & {EndTime}
                </p>
              </div>
              <div class="fix"></div>
              <div class="loc">
                <div class="icon">
                  <LocationOnIcon />
                </div>
                <p>{ticketInfo.Location}</p>
              </div>
              <br />
              <br />
              <div class="loc">
                <div class="icon">
                  <PaidIcon />
                </div>
                <p>{ticketInfo.Price} TND </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPopup;
