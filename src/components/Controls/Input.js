import React from "react";
import { TextField } from "@material-ui/core";
import "react-time-picker/dist/TimePicker.css";

export default function Input(props) {
  const { name, label, value, icon, error = null, onChange, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      starticon={icon}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
