import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ role }) => {
  const [userRole, setuserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const getUser = () => {
    let role = localStorage.getItem("Roles");
    setuserRole(role);
    setIsLoggedIn(localStorage.getItem("Token"));
    console.log(isLoggedIn);
  };

  useEffect(() => {
    getUser();
    console.log(userRole);
  }, []);

  return isLoggedIn && userRole === role ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;

/*
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Define a PrivateRoute component
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;*/
