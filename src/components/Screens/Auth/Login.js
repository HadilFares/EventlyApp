import React, { useEffect, useState } from "react";
import RegisterPic from "../../../assets/Register.jpg";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, Redirect } from "react-router-dom";
import { variables } from "../../../variables";
import "../.././../App.css";
import "../../../css/register.css";
import OutlinedInput from "@mui/material/OutlinedInput";

import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Notification from "../../Controls/Notification";
import { AuthProvider, useAuth } from "../../../context/AuthContext";
export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { signIn, user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onSubmit = async (data) => {
    localStorage.clear();
    try {
      const response = await fetch(variables.API_URL + "Auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("#result", result);
      signIn(result);

      if (result.ISAuthenticated) {
        console.log("Sign up successful");
      } else {
        // Check if the Message property exists before attempting to use it

        setNotify({
          isOpen: true,
          message: result,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error signing up", error.message);
    }
  };

  useEffect(() => {
    if (user && user.Roles.includes("Organizer")) navigate("/organizer/events");
    if (user && user.Roles.includes("Admin")) navigate("/admin/users");
  });
  return (
    <div className="App">
      <section>
        <div className="register">
          <div className="col-1">
            <Notification
              notify={notify}
              setNotify={setNotify}
              vertical="top"
              horizontal="right"
            />
            <h2>Login</h2>
            <span>Login and enjoy the service</span>

            <form
              id="form"
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  {...register("Password", { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {errors.Email?.type === "required" && (
                  <FormHelperText error>Email is required</FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="email"
                  {...register("Email", { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      {/* You can add any adornment here if needed */}
                    </InputAdornment>
                  }
                  label="Email"
                />
                {errors.Email?.type === "required" && (
                  <FormHelperText error>Email is required</FormHelperText>
                )}
              </FormControl>

              <button className="btn" type="submit">
                Login
              </button>
            </form>
          </div>
          <div className="col-2">
            <img src={RegisterPic} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}
