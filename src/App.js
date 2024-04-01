// App.js
import "./App.css";
import React, { useEffect, useState } from "react";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthRoutes } from "./Routes/index";
import AdminHeader from "./components/Header/AdminHeader";
import AdminRoutes from "./Routes/AdminRoutes";
import Login from "./components/Screens/Auth/Login";
import Form from "./components/Screens/Auth/Form";
import OrganizerRoutes from "./Routes/OrganizerRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";
import Users from "./components/Screens/Admin/Users";
import AdminDash from "./components/Screens/Admin/AdminDash";
function App() {
  const methods = useForm(); // Initialize useForm here
  const { watch, errors } = methods;

  /*useEffect(() => {
    console.log("FORM CONTEXT", watch(), errors);
  }, [watch, errors]);
*/
  /*<FormProvider {...methods}>
        <FormsStepper />
      </FormProvider>*/

  const [userRole, setuserRole] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();

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

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes role="Admin" />}>
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/dashboardAdmin" element={<AdminDash />} />
        </Route>

        <Route element={<Login />} path="/login" />
        <Route element={<Form />} path="/Register" />
      </Routes>
    </Router>
  );
}

export default App;
