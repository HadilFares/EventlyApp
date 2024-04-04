import { Grid, makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { useForm, Form } from "./UseForm";
import controls from "../Controls/controls";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function UsersForm(props) {
  const initialFValues = {
    id: 0,
    UserName: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
    Role: "",
  };

  /*  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
 */

  const { addOrEdit, recordForEdit } = props;
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
    if (validate()) {
      addOrEdit({ ...values }, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <controls.Input
            label="First name"
            name="FirstName"
            value={values.FirstName}
            onChange={handleInputChange}
            error={errors.FirstName}
            required
          ></controls.Input>
          <controls.Input
            label="Last name"
            name="LastName"
            value={values.LastName}
            onChange={handleInputChange}
            error={errors.LastName}
            required
          ></controls.Input>
          <controls.Input
            label="Email"
            name="Email"
            value={values.Email}
            onChange={handleInputChange}
            error={errors.Email}
            required
          ></controls.Input>
          <controls.Input
            label="UserName"
            name="UserName"
            value={values.UserName}
            onChange={handleInputChange}
            error={errors.UserName}
            required
          ></controls.Input>
          <controls.Input
            label="PhoneNumber"
            name="PhoneNumber"
            value={values.PhoneNumber}
            onChange={handleInputChange}
            error={errors.PhoneNumber}
            required
          ></controls.Input>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
            <RadioGroup
              aria-label="role"
              name="role"
              value={values.Role}
              onChange={handleInputChange}
              error={errors.Role}
              required
              defaultValue="Organizer"
            >
              <FormControlLabel
                value="Organizer"
                control={<Radio />}
                label="Organizer"
              />
              <FormControlLabel
                value="Participant"
                control={<Radio />}
                label="Participant"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <div>
            <controls.Button type="submit" text="Submit" />
            <controls.Button text="Reset" color="error" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
