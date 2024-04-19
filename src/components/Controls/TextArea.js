import * as React from "react";
import Textarea from "@mui/joy/Textarea";
import { TextField } from "@material-ui/core";
export default function TextArea(props) {
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
