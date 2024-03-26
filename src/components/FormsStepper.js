import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RegisterPic from "../assets/Register.jpg";
import { FormOne, FormTwo } from "./Forms";
import "../css/register.css";

export default function FormsStepper() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formContent, setFormContent] = React.useState({});

  const steps = ["User Information", "Role Selection"];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormContent({ ...formContent, [name]: value });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormContent({});
  };

  const onSubmit = async (data) => {
    try {
      // Your form submission logic here
      console.log("Form submitted:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section>
      <div className="register">
        <div className="col-1">
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography>Completed</Typography>
                <Button onClick={handleReset}>Close</Button>
              </div>
            ) : (
              <div>
                {activeStep === 0 ? (
                  <FormOne
                    formContent={formContent}
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={handleNext}
                    errors={errors}
                  />
                ) : (
                  <FormTwo
                    formContent={formContent}
                    register={register}
                    handleSubmit={handleSubmit(onSubmit)}
                    handleBack={handleBack}
                    errors={errors}
                  />
                )}
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit(onSubmit)
                        : handleNext
                    }
                  >
                    {activeStep === steps.length - 1 ? "Sign Up" : "Next"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-2">
          <img src={RegisterPic} alt="" />
        </div>
      </div>
    </section>
  );
}
