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

import Login from "./components/Screens/Auth/Login";
import Form from "./components/Screens/Auth/RegisterForm";
import PrivateRoutes from "./Routes/PrivateRoutes";
import Users from "./components/Screens/Admin/Users";
import AdminDash from "./components/Screens/Admin/AdminDash";
import CustomDrawer from "./components/Communs/Drawer";
import { AuthProvider } from "./context/AuthContext";
import PendingAccounts from "./components/Screens/Admin/PendingAccounts";
import Events from "./components/Screens/Organizer/Events";
import PendingEvents from "./components/Screens/Admin/PendingEvents";
import RegisterForm from "./components/Screens/Auth/RegisterForm";
import Categories from "./components/Screens/Organizer/Categories";
import ListOrganizerCategories from "./components/Screens/Organizer/ListOrganizerCategories";
import TicketPopup from "./components/Screens/Organizer/TicketPopup";
function App() {
  const methods = useForm(); // Initialize useForm here
  const { watch, errors } = methods;

  return (
    <Router>
      <Routes>
        <Route path={"register"} element={<RegisterForm />} />
      </Routes>
      <AuthProvider>
        <CustomDrawer>
          <Routes>
            <Route path={"admin"} element={<PrivateRoutes role="Admin" />}>
              <Route path={"users"} element={<Users />} />
              <Route path={"dashboard-admin"} element={<AdminDash />} />
              <Route path={"pending-Account"} element={<PendingAccounts />} />
              <Route path={"pending-Events"} element={<PendingEvents />} />
            </Route>
            <Route
              path={"organizer"}
              element={<PrivateRoutes role="Organizer" />}
            >
              <Route path={"events"} element={<Events />} />
              <Route path={"categories"} element={<Categories />} />
              <Route
                path={"mycategories"}
                element={<ListOrganizerCategories />}
              />

              <Route path={"myticket"} element={<TicketPopup />} />
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
