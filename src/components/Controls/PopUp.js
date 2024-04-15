import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
  Box,
  useTheme,
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import controls from "./controls";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(0),
    position: "absolute",
    top: theme.spacing(2),
    background: "white",
    width: "600px",
    backdropFilter: "blur(8.5px)",
    webkitBackdropFilter: " blur(8.5px)",
  },
  dialogTitle: {
    letterSpacing: 6,
    fontFamily: '"Raleway", sans-serif',
    textTransform: "uppercase",
    color: "#570b03",
  },
}));

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex", height: "25px" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            <Box sx={{ letterSpacing: 8, textAlign: "center" }}> {title}</Box>
          </Typography>
          <controls.ActionButton
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers className={classes.dividers}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
//
