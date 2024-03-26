// App.js
import "./App.css";
import React, { useEffect } from "react";

import { useForm, useFormContext, FormProvider } from "react-hook-form";

import FormsStepper from "./components/FormsStepper";
function App() {
  const methods = useForm(); // Initialize useForm here
  const { watch, errors } = methods;

  useEffect(() => {
    console.log("FORM CONTEXT", watch(), errors);
  }, [watch, errors]);

  return (
    <div className="App">
      <FormProvider {...methods}>
        <FormsStepper />
      </FormProvider>
    </div>
  );
}

export default App;
