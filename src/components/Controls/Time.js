import { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
export default function Time(props) {
  const { name, label, value, icon, error = null, onChange, ...other } = props;

  return (
    <div>
      <TimePicker name={name} onChange={onChange} value={value} />
    </div>
  );
}
