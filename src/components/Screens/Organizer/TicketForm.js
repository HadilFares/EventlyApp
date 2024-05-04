import { Grid, makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import controls from "../../Controls/controls";
import "./Ticket.css";
import axios from "axios";
import { variables } from "../../../variables";
import "./Form.css";
import "react-time-picker/dist/TimePicker.css";
import { useAuth } from "../../../context/AuthContext";
import { Form } from "../../Communs/UseForm";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function TicketForm(props) {
  console.log("props", props);
  const { TicketInfo, addTicket, onEditSuccess, setOpenPopup, mode } = props;

  console.log("AddTicketpass", addTicket);

  console.log("TICKETINFO", TicketInfo);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  console.log("#StartDate", TicketInfo?.StartDate);
  const EndDate = new Date(TicketInfo?.EndDate);
  const StartDate = new Date(TicketInfo?.StartDate);
  const formattedStartDate = StartDate.toISOString().slice(0, 10);
  // Format the date to "YYYY-MM-DD"
  const formattedEndDate = EndDate.toISOString().slice(0, 10);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues:
      mode === "add"
        ? {
            Name: addTicket?.Name,
            StartDate: addTicket?.StartDate,
            EndDate: addTicket?.EndDate,
            StartTime: addTicket?.StartTime,
            EndTime: addTicket?.EndTime,
            Location: addTicket?.Location,
            Price: addTicket?.Price,
          }
        : {
            Name: TicketInfo?.Name,
            StartDate: formattedStartDate,
            EndDate: formattedEndDate,
            StartTime: TicketInfo?.StartTime,
            EndTime: TicketInfo?.EndTime,
            Location: TicketInfo?.Location,
            Price: TicketInfo?.Price,
            TicketColor: TicketInfo?.TicketColor,
          },
  });
  const { user } = useAuth();
  console.log("#user", user);

  const resetForm = () => {
    reset(); // This resets the form fields
  };

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

  const EditTicket = async (ticketInfo) => {
    try {
      console.log("idticketedit", TicketInfo.Id);
      console.log("ticketinfoEdit", ticketInfo);
      await axios.put(
        variables.API_URL + `Ticket/${TicketInfo.Id}`,
        {
          Id: TicketInfo.Id,
          EventId: TicketInfo.EventId,
          Name: ticketInfo.Name,
          StartDate: new Date(ticketInfo.StartDate + "T20:00:00"),
          EndDate: new Date(ticketInfo.EndDate + "T20:00:00"),
          StartTime: ticketInfo.StartTime,
          EndTime: ticketInfo.EndTime,
          Location: ticketInfo.Location,
          Price: ticketInfo.Price,
          TicketColor: ticketInfo.TicketColor,
        },
        config
      );
      setOpenPopup(false);
      onEditSuccess(ticketInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const addOrEditTicket = async (TicketInfo) => {
    console.log("#Ticketinfo", TicketInfo);
    console.log("idevent", addTicket.Id);

    try {
      const { data } = await axios.post(
        variables.API_URL + "Ticket",
        {
          EventId: addTicket.Id,
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
        setOpenPopup(false);
        setIsPopupOpen(false);
      }
    } catch (error) {
      //  setloading(false);
      console.log(error.response.data.message);
    }
  };

  const Formhandle = (data) => {
    if (mode === "edit") {
      EditTicket(data);
    } else {
      addOrEditTicket(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(Formhandle)}>
        <input
          type="hidden"
          {...register("Id")}
          value={mode === "add" ? addTicket.Id : TicketInfo.Id}
        />
        {!isPopupOpen && (
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <FormControl>
                <div>Name</div>
                <OutlinedInput
                  type="text"
                  {...register("Name", { required: true })}
                  className="tight-spacing-input"
                />
                {errors.Name?.type === "required" && (
                  <FormHelperText error>Name is required</FormHelperText>
                )}
              </FormControl>
              <br />
              <FormControl>
                <div>TicketColor</div>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="color"
                  {...register("TicketColor", { required: true })}
                  label="TicketColor"
                  className="tight-spacing-input"
                />
                {errors.Name?.type === "required" && (
                  <FormHelperText error>TicketColor</FormHelperText>
                )}
              </FormControl>
              <br />
              <FormControl>
                <div>Price</div>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="number"
                  {...register("Price", { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      {/* You can add any adornment here if needed */}
                    </InputAdornment>
                  }
                  label="Price"
                  className="tight-spacing-input"
                />
                {errors.Name?.type === "required" && (
                  <FormHelperText error>Price</FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <div>Location</div>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="text"
                  {...register("Location", { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      {/* You can add any adornment here if needed */}
                    </InputAdornment>
                  }
                  label="Location"
                  className="tight-spacing-input"
                />
                {errors.Name?.type === "required" && (
                  <FormHelperText error>Location</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <div>StartDate</div>
                <OutlinedInput
                  type="date"
                  {...register("StartDate", { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      {/* You can add any adornment here if needed */}
                    </InputAdornment>
                  }
                  lable="StartDate"
                  className="tight-spacing-input"
                />
                {errors.Name?.type === "required" && (
                  <FormHelperText error>StartDate</FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <div>EndDate</div>
                <OutlinedInput
                  type="date"
                  {...register("EndDate", { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      {/* You can add any adornment here if needed */}
                    </InputAdornment>
                  }
                  label="EndDate"
                  className="tight-spacing-input"
                />
                {errors.Name?.type === "required" && (
                  <FormHelperText error>EndDate</FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <div>StartTime</div>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="time"
                  {...register("StartTime", { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      {/* You can add any adornment here if needed */}
                    </InputAdornment>
                  }
                  label="StartTime"
                  className="tight-spacing-input"
                />
                {errors.Name?.type === "required" && (
                  <FormHelperText error>StartTime</FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <div>EndTime</div>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="time"
                  {...register("EndTime", { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      {/* You can add any adornment here if needed */}
                    </InputAdornment>
                  }
                  label="EndTime"
                  className="tight-spacing-input"
                />
                {errors.Name?.type === "required" && (
                  <FormHelperText error>EndTime</FormHelperText>
                )}
              </FormControl>

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
      </form>
      {/*<div className="ticket-container">{isPopupOpen && <TicketPopup />}</div>*/}
    </>
  );
}
