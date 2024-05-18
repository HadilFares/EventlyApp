import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const PrivateRoutes = ({ children, role }) => {
  const { user, isLoading } = useAuth();

  console.log("user", user);
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  return user?.ISAuthenticated && user.Roles.includes(role) ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
