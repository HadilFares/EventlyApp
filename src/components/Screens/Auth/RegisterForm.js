import React from "react";
import RegisterPic from "../../../assets/Register.jpg";
import { useForm } from "react-hook-form";
import "../../../css/register.css";
import { variables } from "../../../variables";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  let history = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(variables.API_URL + "Auth/signUp", {
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
      if (result.ISAuthenticated) {
        // history("/login");
        // window.location.reload();
        console.log("Sign up successful");
      } else {
        // Check if the error message indicates an issue with the email or password
        if (
          result.Message.includes("email") ||
          result.Message.includes("password")
        ) {
          alert("Incorrect email or password.");
          /*  setNotify({
            isOpen: true,
            message: "Incorrect email or password",
            type: "error",
          });*/
        } else {
          console.error("Sign up failed: " + result.Message);
        }
      }
    } catch (error) {
      console.error("Error signing up", error.message);
    }
  };

  return (
    <section className="App">
      <div className="register">
        <div className="col-1">
          <h2>Sign In</h2>
          <span>register and enjoy the service</span>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("FirstName", { required: true })}
              placeholder="FirstName"
            />
            {errors.FirstName?.type === "required" && "FirstName is required"}
            <input
              type="text"
              {...register("LastName", { required: true })}
              placeholder="LastName"
            />
            {errors.LastName?.type === "required" && "LastName is required"}

            <input
              type="text"
              {...register("Username", { required: true, maxLength: 20 })}
              placeholder="username"
            />
            {errors.Username?.type === "required" && "Username is required"}
            {errors.Username?.type === "maxLength" && "Max Length Exceed"}
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
            <legend>Please select your preferred contact method:</legend>
            <div className="flex">
              <label>
                <input
                  type="radio"
                  value="Organizer"
                  {...register("Role", { required: true })}
                />
                Organizer
              </label>
              <label>
                <input
                  type="radio"
                  value="Participant"
                  {...register("Role", { required: true })}
                />
                Participant
              </label>
              <label>
                <input
                  type="radio"
                  value="Exhibitor"
                  {...register("Role", { required: true })}
                />
                Exhibitor
              </label>
              {errors.Role?.type === "required" && "role is required"}
            </div>
            <input
              type="text"
              {...register("Number", { required: true })}
              placeholder="mobile number"
            />
            {errors.Number?.type === "required" && "Mobile Number is required"}
            <button className="btn" type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className="col-2">
          <img src={RegisterPic} alt="" />
        </div>
      </div>
    </section>
  );
}
