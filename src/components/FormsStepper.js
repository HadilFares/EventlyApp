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

function getSteps() {
  return ["User Information", "Role Selection"];
}
function getStepContent(step, formContent, handleChange) {
  switch (step) {
    case 0:
      return <FormOne {...{ formContent }} />;
    case 1:
      return <FormTwo {...{ formContent, handleChange }} />;
    default:
      return "Unknown step";
  }
}

export default function FormsStepper() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formContent, setFormContent] = React.useState({});
  const [compiledForm, setCompiledForm] = React.useState({});
  const steps = getSteps();
  const form = watch();
  /* const handleChange = (event) => {
    const { name, value } = event.target;
    setFormContent({ ...formContent, [name]: value });
  };
*/
  const handleNext = () => {
    let canContinue = true;

    switch (activeStep) {
      case 0:
        setCompiledForm({ ...compiledForm, userInformation: form });
        canContinue = true;
        break;
      case 1:
        setCompiledForm({ ...compiledForm, role: form });
        canContinue = handleSubmit({ ...compiledForm, role: form });
        break;
      default:
        return "not a valid step";
    }
    if (canContinue) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      switch (activeStep) {
        case 1:
          setCompiledForm({ ...compiledForm, role: form });
          break;
        default:
          return "not a valid step";
      }
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormContent({});
  };

  /*const handleSubmit = (form) => {
    if (_.isEmpty(errors)) {
      console.log("submit", form);
    }
  };
*/
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
                    
                  />
                ) : (
                  <FormTwo
                    formContent={formContent}
                  
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
