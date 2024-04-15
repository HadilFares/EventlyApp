// App.js
import "./App.css";
import "./index.css";
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
import PendingAccounts from "./components/Screens/Admin/PendingAccounts";
import Events from "./components/Screens/Organizer/Events";
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
              <Route path={"pending-Account"} element={<PendingAccounts />} />
            </Route>
            <Route
              path={"organizer"}
              element={<PrivateRoutes role="Organizer" />}
            >
              <Route path={"events"} element={<Events />} />
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
