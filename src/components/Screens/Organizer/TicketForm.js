import { Grid, makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { useForm, Form } from "../../Communs/UseForm";
import controls from "../../Controls/controls";
import "./Ticket.css";
import axios from "axios";
import { variables } from "../../../variables";

import "react-time-picker/dist/TimePicker.css";
import TicketPopup from "./TicketPopup";
export default function TicketForm({ setOpenPopup, addTicket }) {
  const [DefaultDate, setDefaultDate] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  function convertTo24HourFormat(timeString) {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  }

  const initialFValues = {
    Id: "",
    EventId: addTicket.Id,
    Name: "",
    StartDate: "",
    EndDate: "",
    StartTime: "",
    EndTime: "",
    Location: "",
    Price: "",
    TicketColor: "",
  };

  const config = {
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  function formatDateForBackend(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatTimeForBackend(timeString) {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  }

  const addOrEditTicket = async (TicketInfo) => {
    console.log("#Ticketinfo", TicketInfo);

    try {
      const { data } = await axios.post(
        variables.API_URL + "Ticket",
        {
          EventId: TicketInfo.Id,
          Name: TicketInfo.Name,
          StartDate: formatDateForBackend(TicketInfo.StartDate),
          EndDate: formatDateForBackend(TicketInfo.EndDate),
          StartTime: formatTimeForBackend(TicketInfo.StartTime),
          EndTime: formatTimeForBackend(TicketInfo.EndTime),
          Location: TicketInfo.Location,
          Price: TicketInfo.Price,
          TicketColor: TicketInfo.TicketColor,
        },
        config
      );
      console.log("EventInfoCreate", TicketInfo);
      console.log("data", data);
      if (data) {
        setNotify({
          isOpen: true,
          message: "Submitted Successfully",
          type: "success",
        });

        setIsPopupOpen(true);
      }
    } catch (error) {
      //  setloading(false);
      console.log(error.response.data.message);
    }

    //  resetForm();
    // setRecordForEdit(null);
    // setAddTicket(null);
    // setOpenPopup(false);
  };
  console.log("addticket", addTicket);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("#Values", values);
    if (validate()) {
      addOrEditTicket({ ...values });
    }
  };

  useEffect(() => {
    /*if (recordForEdit != null);*/
    if (addTicket)
      setValues({
        ...addTicket,
        StartDate: addTicket.StartDate ? addTicket.StartDate.split("T")[0] : "",
      });
  }, [addTicket]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {!isPopupOpen && (
          <Grid container>
            <Grid item xs={6}>
              <controls.Input
                label="Name"
                name="Name"
                value={values.Name}
                onChange={handleInputChange}
                error={errors.Name}
                required
              ></controls.Input>
              <controls.Input
                label="Color"
                type="color"
                name="TicketColor"
                value={values.TicketColor}
                onChange={handleInputChange}
                error={errors.TicketColor}
                required
              ></controls.Input>
              <controls.Input
                label="Price"
                name="Price"
                value={values.Price}
                onChange={handleInputChange}
                error={errors.Price}
                required
              ></controls.Input>
              <controls.Input
                label="Location"
                name="Location"
                value={values.Location}
                onChange={handleInputChange}
                error={errors.Location}
                required
              ></controls.Input>
            </Grid>
            <Grid item xs={6}>
              <controls.Input
                label="StartDate"
                name="StartDate"
                type="date"
                value={convertDateFormat(values.StartDate)}
                onChange={handleInputChange}
                error={errors.StartDate}
                required
              ></controls.Input>
              <controls.Input
                label="EndDate"
                name="EndDate"
                type="date"
                value={convertDateFormat(values.EndDate)}
                onChange={handleInputChange}
                error={errors.EndDate}
                required
              ></controls.Input>

              <controls.Input
                label="StartTime"
                type="time"
                name="StartTime"
                value={convertTo24HourFormat(values.StartTime)}
                onChange={handleInputChange}
                error={errors.StartTime}
                required
              ></controls.Input>
              <controls.Input
                label="EndTime"
                name="EndTime"
                type="time"
                value={convertTo24HourFormat(values.EndTime)}
                onChange={handleInputChange}
                error={errors.EndTime}
                required
              ></controls.Input>
              <div>
                <controls.Button type="submit" text="Submit" />
                <controls.Button
                  text="Reset"
                  color="error"
                  onClick={resetForm}
                />
              </div>
            </Grid>
            <Grid item xs={9}></Grid>
          </Grid>
        )}{" "}
      </Form>
      <div className="ticket-container">{isPopupOpen && <TicketPopup />}</div>
    </>
  );
}
