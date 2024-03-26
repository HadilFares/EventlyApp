/*import React from "react";
import RegisterPic from "../assets/Register.jpg";
import { useForm } from "react-hook-form";
import "../css/register.css";
export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await fetch(variables.API_URL+signUp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const result = await response.json();

      // Check if the user is authenticated
      if (result.ISAuthenticated) {
        console.log("Sign up successful");
        // You can handle the successful sign up here, such as redirecting the user to another page
      } else {
        console.error("Sign up failed: " + result.Message);
        // Handle failed sign up, display error message to the user, etc.
      }
    } catch (error) {
      console.error("Error signing up", error.message);
    }
  };

  return (
    <section>
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
              {...register("Username")}
              placeholder="username"
            />
            <input
              type="text"
              {...register("Email", { required: true })}
              placeholder="mobile number"
            />

            <input
              type="text"
              {...register("LastName", { required: true })}
              placeholder="LastName"
            />
            <input
              type="text"
              {...register("FirstName", { required: true })}
              placeholder="FirstName"
            />
            <input
              type="text"
              {...register("Number", { required: true, maxLength: 10 })}
              placeholder="mobile number"
            />
            <input
              type="text"
              {...register("password", { required: true })}
              placeholder="password"
            />

            {errors.mobile?.type === "required" && "Mobile Number is required"}
            {errors.mobile?.type === "maxLength" && "Max Length Exceed"}
            <button className="btn">Sign In</button>
          </form>
        </div>
        <div className="col-2">
          <img src={RegisterPic} alt="" />
        </div>
      </div>
    </section>
  );
}
*/
