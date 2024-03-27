// App.js
import "./App.css";
import React, { useEffect } from "react";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import FormsStepper from "./components/FormsStepper";
import { AuthRoutes } from "./Routes/index";
import Form from "./components/Form";
import Login from "./components/Login";
function App() {
  const methods = useForm(); // Initialize useForm here
  const { watch, errors } = methods;

  /*useEffect(() => {
    console.log("FORM CONTEXT", watch(), errors);
  }, [watch, errors]);
*/
  /*<FormProvider {...methods}>
        <FormsStepper />
      </FormProvider>*/
  return (
      <Router>
        <AuthRoutes />
      </Router>
    /*<div className="App">
      <Form />
      <Login/>
    </div>*/
  );
}

export default App;
