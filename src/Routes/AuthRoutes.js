import React from "react";

import { Route, Routes } from "react-router-dom";
import Form from "../components/Form";
import Login from "../components/Login";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" component={Login} exact />
      <Route path="/" component={Form} exact />
    </Routes>
  );
}

export default AuthRoutes;
