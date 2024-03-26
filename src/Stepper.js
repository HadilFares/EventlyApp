// FormStepper.jsx
/*import React from "react";
import { useForm } from "react-hook-form";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { FormOne, FormTwo } from "./components/Forms";

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

export const FormStepper = () => {
  const { watch, errors } = useForm();
  const [activeStep, setActiveStep] = React.useState(0);
  const [compiledForm, setCompiledForm] = React.useState({});
  const steps = getSteps();
  const form = watch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompiledForm({ ...compiledForm, [name]: value });
  };

  const handleNext = () => {
    let canContinue = true;

    switch (activeStep) {
      case 0:
        setCompiledForm({ ...compiledForm, userInformation: form });
        canContinue = true;
        break;
      case 1:
        setCompiledForm({ ...compiledForm, role: form.role });
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
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompiledForm({});
  };

  const handleSubmit = (form) => {
    if (Object.keys(errors).length === 0) {
      console.log("submit", form);
    }
  };

  return (
    <div>
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
            {getStepContent(activeStep, compiledForm, handleChange)}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "SignUp" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
*/