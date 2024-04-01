import React from "react";

import { Route, Router, Routes } from "react-router-dom";
import Form from "../components/Screens/Auth/Form";
import Login from "../components/Screens/Auth/Login";
import { Container } from "react-bootstrap";

function AuthRoutes() {
  return (
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Form />} />
      </Routes>
   
  );
}

export default AuthRoutes;
