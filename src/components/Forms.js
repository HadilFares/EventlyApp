
import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import "../css/register.css";
export const FormOne = ({ formContent, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { reset } = useFormContext();

  useEffect(() => {
    reset({ ...formContent }, { errors: true });
  }, [formContent]);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("Username")} placeholder="username" />
      <input
        type="text"
        {...register("Email", { required: true })}
        placeholder="Email"
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
    </form>
  );
};

export const FormTwo = ({ formContent, onSubmit, handleChange }) => {
  const { reset } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Reset form content when it changes
    reset({ ...formContent }, { errors: true });
  }, [formContent]);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="radio"
        name="role"
        value="Organizer"
        onChange={handleChange}
        defaultChecked={formContent.role === "Organizer"}
      />
      <label htmlFor="Admin">Organizer</label>
      <br />
      <input
        type="radio"
        name="role"
        value="Participant"
        onChange={handleChange}
        defaultChecked={formContent.role === "Participant"}
      />
      <label htmlFor="Participant">Participant</label>
      <br />
      <input
        type="radio"
        name="role"
        value="Exhibitor"
        onChange={handleChange}
        defaultChecked={formContent.role === "Exhibitor"}
      />
      <label htmlFor="Exhibitor">Exhibitor</label>
    </form>
  );
};
