import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@material-ui/core";

export default function Select(props) {
  const { name, label, value, onChange, options } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  console.log("value", value);
  console.log("name", name);
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        name={name}
        value={value}
        onChange={(e) => onChange(convertToDefEventPara(name, e.target.value))}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
