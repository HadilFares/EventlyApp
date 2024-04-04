import React, { useEffect, useState } from "react";
import RegisterPic from "../../../assets/Register.jpg";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, Redirect } from "react-router-dom";
import { variables } from "../../../variables";
import "../.././../App.css";
import "../../../css/register.css";
import Notification from "../../Controls/Notification";
import { AuthProvider, useAuth } from "../../../context/AuthContext";
export default function Login() {
  const { signIn } = useAuth();
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
      console.log(data);
      const result = await response.json();
      console.log(result);
      signIn(result);
      // console.log(result.Roles[0]);

      if (result.ISAuthenticated) {
        console.log("Sign up successful");
      }
    } catch (error) {
      console.error("Error signing up", error.message);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setNotify({
          isOpen: true,
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };
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
              <input
                type="email"
                {...register("Email", { required: true })}
                placeholder="Email "
              />
              {errors.Email?.type === "required" && "Email is required"}

              <input
                type="password"
                {...register("Password", { required: true })}
                placeholder="password"
              />
              {errors.Password?.type === "required" && "Password is required"}
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
