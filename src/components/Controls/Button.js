/*import React from "react";
import { Button as MuiButton, makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

export default function Button(props) {
  const { text, size, color, variant, onClick, ...other } = props;
  const theme = useTheme();

  const classes = useStyles();

  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
}
*/
import React from "react";
import { Button as MuiButton, makeStyles, useTheme } from "@material-ui/core";

const validColors = ["default", "inherit", "primary", "secondary"];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

export default function Button(props) {
  const { text, size, color, variant, onClick, starticon, ...other } = props;
  const theme = useTheme();

  const classes = useStyles();

  // Check if the provided color is valid, otherwise default to "primary"
  const buttonColor = validColors.includes(color) ? color : "primary";

  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={buttonColor}
      onClick={onClick}
      starticon={starticon}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
}
