
import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import "../css/register.css";
export const FormOne = ({ formContent, onSubmit }) => {
 const methods = useFormContext();
 const { reset, register } = methods;


 useEffect(() => {
   reset({ ...formContent.one }, { errors: true });
 }, []);

  return (
    <form className="flex flex-col">
      <input
        type="text"
        name="Username"
        placeholder="Username"
        ref={register({ required: true })}
      />
      <input
        type="text"
        name="Email"
        ref={register({ required: true })}
        placeholder="Email"
      />
      <input
        type="text"
        name="LastName"
        ref={register({ required: true })}
        placeholder="LastName"
      />
      <input
        type="text"
        ref={register({ required: true })}
        name="FirstName"
        placeholder="FirstName"
      />
      <input
        type="text"
        name="Number"
        ref={register({ required: true })}
        placeholder="mobile number"
      />
      <input
        type="text"
        ref={register({ required: true })}
        name="Password"
        placeholder="password"
      />
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
