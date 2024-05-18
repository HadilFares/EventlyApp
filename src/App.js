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
import Home from "./components/Screens/LandingPage/home/Home.jsx";
import Footer from "./components/Screens/LandingPage/common/footer/Footer.jsx";
function App() {
  const methods = useForm(); // Initialize useForm here
  const { watch, errors } = methods;

  //footer/header
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<Home />} />
          <Route element={<Login />} path="/login" />
        </Routes>

        <CustomDrawer>
          <Routes>
            {/* ***********! ADMIN DASHBOARD ******************** */}

            <Route path="admin" element={<PrivateRoutes role="Admin" />}>
              <Route path="users" element={<Users />} />
              <Route path="dashboard-admin" element={<AdminDash />} />
              <Route path="pending-Account" element={<PendingAccounts />} />
              <Route path="pending-Events" element={<PendingEvents />} />
            </Route>

            {/* *********** ADMIN DASHBOARD ******************** */}
            <Route path="organizer">
              <Route
                path="events"
                element={
                  <PrivateRoutes role="Organizer">
                    <Events />
                  </PrivateRoutes>
                }
              />
              <Route path="categories" element={<Categories />} />
              <Route
                path="mycategories"
                element={<ListOrganizerCategories />}
              />

              <Route path="myticket" element={<TicketPopup />} />
            </Route>
          </Routes>
        </CustomDrawer>
      </AuthProvider>
    </Router>
  );
}

export default App;
