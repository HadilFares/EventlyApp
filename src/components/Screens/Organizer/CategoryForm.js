import { Grid, makeStyles } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { variables } from "../../../variables";
import controls from "../../Controls/controls";
import "react-time-picker/dist/TimePicker.css";
import { useAuth } from "../../../context/AuthContext";
export default function CategoryForm(props) {
  const { mode, AddCategory, editingCategory, handleEditSubmit } = props;

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: mode === "edit" ? { Name: editingCategory.Name } : {},
  });
  const { user } = useAuth();
  console.log("#user", user);

  const resetForm = () => {
    reset(); // This resets the form fields
  };
  const Formhandle = (data) => {
    if (mode === "edit") {
      handleEditSubmit(data);
    } else {
      AddCategory(data);
    }
  };
  return (
    <form
      id="form"
      className="flex flex-col"
      onSubmit={handleSubmit(Formhandle)}
    >
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment">Name</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email"
          type="text"
          {...register("Name", { required: true })}
          endAdornment={
            <InputAdornment position="end">
              {/* You can add any adornment here if needed */}
            </InputAdornment>
          }
          label="Name"
        />
        {errors.Name?.type === "required" && (
          <FormHelperText error>Name is required</FormHelperText>
        )}
      </FormControl>
      <div>
        <controls.Button type="submit" text="Submit" />
        <controls.Button text="Reset" color="error" onClick={resetForm} />
      </div>
    </form>
  );
}
