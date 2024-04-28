import React, { useState } from "react";
import "./Ticket.css";
import { useLocation } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PaidIcon from "@mui/icons-material/Paid";
import controls from "../../Controls/controls";
import Modal from "@mui/material/Modal";

import { Box } from "@mui/material";
import TicketForm from "./TicketForm";
import Popup from "../../Controls/PopUp";
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
  const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  const ticketInfo = location.state?.ticketInfo;
  console.log("TicketInfoPop", ticketInfo);
  const startDate = new Date(ticketInfo.StartDate);
  const formattedDate = startDate.toISOString().slice(0, 10);
  const EndDate = new Date(ticketInfo.EndDate);
  const formattedEndDate = EndDate.toISOString().slice(0, 10);
  const openInPopup = (item) => {
    setOpenPopup(true);
  };
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

  const StartTime = convertTo12HourFormat(ticketInfo.StartTime);
  const EndTime = convertTo12HourFormat(ticketInfo.EndTime);

  return (
    <>
      {" "}
      {/* Adjust the marginLeft value as needed */}
      <Box sx={{ marginLeft: 3 }}>
        <controls.Button
          text="Edit Ticket"
          onClick={handleOpen}
        ></controls.Button>
      </Box>
      <Popup title={"Ticket Form"} setOpenPopup={true} openPopup={openPopup}>
        <TicketForm mode="edit" TicketInfo={ticketInfo} />
      </Popup>
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
    </>
  );
};

export default TicketPopup;
