import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import dayjs from "dayjs";
export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input field name is "Price"
    if (name === "Price") {
      // Regular expression to match numbers or doubles
      const numberRegex = /^[0-9]*\.?[0-9]*$/;
      // Check if the input value matches the regex
      if (numberRegex.test(value) || value === "") {
        // If it matches, update the state with the new value
        const newValue = value || "";
        setValues({
          ...values,
          [name]: newValue,
        });
        if (validateOnChange) validate({ [name]: newValue });
      }
    } else if (name === "NbStand") {
      // Check if the input value is not negative
      if (parseFloat(value) >= 0 || value === "") {
        // If it's not negative, update the state with the new value
        const newValue = value || "";
        setValues({
          ...values,
          [name]: newValue,
        });
        if (validateOnChange) validate({ [name]: newValue });
      }
    } else {
      // For other input fields, update the state directly without validation
      const newValue = value || "";
      setValues({
        ...values,
        [name]: newValue,
      });
    }
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form
      className={classes.root}
      autoComplete="off"
      style={{ width: "500px" }}
      {...other}
    >
      {props.children}
    </form>
  );
}
