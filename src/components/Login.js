import React from "react";
import RegisterPic from "../assets/Register.jpg";
import { useForm } from "react-hook-form";
import "../css/register.css";
import { variables } from "../variables";
import "../App.css"
export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
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
      if (result.ISAuthenticated) {
        console.log("Sign up successful");
      } else {
        console.error("Sign up failed: " + result.Message);
      }
    } catch (error) {
      console.error("Error signing up", error.message);
    }
  };

    return (
      <div className="App">
    <section >
      <div className="register">
        <div className="col-1">
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
