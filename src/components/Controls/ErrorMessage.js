import { Alert } from "@mui/material";
import React from "react";

export default function Errormessage({ severity = "info", children }) {
  return (
    <Alert variant="filled" severity={severity}>
      <strong>{children}</strong>
    </Alert>
  );
}
