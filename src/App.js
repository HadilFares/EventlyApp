// App.js
import "./App.css";
import React, { useEffect, useState } from "react";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { AuthRoutes } from "./Routes/index";
import AdminHeader from "./components/Header/AdminHeader";
import AdminRoutes from "./Routes/AdminRoutes";
import Login from "./components/Screens/Auth/Login";
import Form from "./components/Screens/Auth/Form";
import OrganizerRoutes from "./Routes/OrganizerRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";
import Users from "./components/Screens/Admin/Users";
import AdminDash from "./components/Screens/Admin/AdminDash";
import CustomDrawer from "./components/Communs/Drawer";
import NavBar from "./components/Communs/NavBar";
import { AuthProvider } from "./context/AuthContext";
function App() {
  const methods = useForm(); // Initialize useForm here
  const { watch, errors } = methods;

  return (
    <Router>
      <AuthProvider>
        <CustomDrawer>
          <Routes>
            <Route path={"admin"} element={<PrivateRoutes role="Admin" />}>
              <Route path={"users"} element={<Users />} />
              <Route path={"dashboard-admin"} element={<AdminDash />} />
            </Route>
            <Route element={<Login />} path="/login" />
            <Route element={<Form />} path="/register" />
          </Routes>
        </CustomDrawer>
      </AuthProvider>
    </Router>
  );
}

export default App;
