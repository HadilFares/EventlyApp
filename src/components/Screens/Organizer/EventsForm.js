import { Grid, makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { useForm, Form } from "../../Communs/UseForm";
import controls from "../../Controls/controls";
import Box from "@mui/material/Box";
import axios from "axios";
import { variables } from "../../../variables";
import dayjs from "dayjs";
import "react-time-picker/dist/TimePicker.css";
export default function EventsForm(props) {
  const [DefaultDate, setDefaultDate] = useState("");
  const initialFValues = {
    Id: 0,
    Name: "",
    Description: "",
    StartDate: "",
    EndDate: "",
    StartTime: "",
    EndTime: "",
    Type: "",
    Location: "",
    Price: "",
    NbStand: "",
    CategoryName: "",
  };

  const { addOrEdit, recordForEdit, Categories } = props;
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
    console.log("#Values", values);
    if (validate()) {
      addOrEdit({ ...values }, resetForm);
    }
  };
  const categoryOptions = Categories.map((category) => ({
    label: category.Name,
    value: category.Name,
  }));
  console.log("categoryNames", categoryOptions);
  const Types = [
    { label: "Foire", value: "Foire" },
    { label: "Salons", value: "Salons" },
    { label: "Expositions", value: "Expositions" },
  ];
  useEffect(
    () => {
      if (recordForEdit != null) console.log("effectrecord", recordForEdit);
      setValues({
        ...recordForEdit,
      });
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      setDefaultDate(formattedDate);
    },
    [recordForEdit],
    []
  );

  return (
    <Form onSubmit={handleSubmit}>
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
          <controls.TextArea
            label="Description"
            name="Description"
            value={values.Description}
            onChange={handleInputChange}
            error={errors.Description}
            multiline
            rows={4}
            variant="outlined"
            required
          ></controls.TextArea>
          <Box sx={{ minWidth: 120 }}>
            <controls.Select
              label="Type"
              name="Type"
              value={values.Type}
              onChange={handleInputChange}
              options={Types}
              error={errors.Type}
              required
            ></controls.Select>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <controls.Select
              label="CategoryName"
              name="CategoryName"
              value={values.CategoryName}
              onChange={handleInputChange}
              options={categoryOptions}
              error={errors.CategoryName}
              required
            ></controls.Select>
          </Box>
          <controls.Input
            label="Price"
            name="Price"
            value={values.Price}
            onChange={handleInputChange}
            error={errors.Price}
            required
          ></controls.Input>
          <controls.Input
            label="NbStand"
            name="NbStand"
            type="number"
            value={values.NbStand}
            onChange={handleInputChange}
            error={errors.NbStand}
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
            value={values.StartDate}
            onChange={handleInputChange}
            error={errors.StartDate}
            required
          ></controls.Input>
          <controls.Input
            label="EndDate"
            name="EndDate"
            type="date"
            value={values.EndDate}
            onChange={handleInputChange}
            error={errors.EndDate}
            required
          ></controls.Input>

          <controls.Input
            label="StartTime"
            type="time"
            name="StartTime"
            value={values.StartTime}
            onChange={handleInputChange}
            error={errors.StartTime}
            required
          ></controls.Input>
          <controls.Input
            label="EndTime"
            name="EndTime"
            type="time"
            value={values.EndTime}
            onChange={handleInputChange}
            error={errors.EndTime}
            required
          ></controls.Input>
          <div>
            <controls.Button type="submit" text="Submit" />
            <controls.Button text="Reset" color="error" onClick={resetForm} />
          </div>
        </Grid>
        <Grid item xs={9}></Grid>
      </Grid>
    </Form>
  );
}
