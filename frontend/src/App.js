import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PersonalDataForm from "./components/PersonalDataForm";
import CompanyDetailsForm from "./components/CompanyDetailsForm";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFD700",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function App() {
  const handleSubmit = (formData) => {
    console.log(formData);
    // You can handle the form submission here if needed
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/personal-data"
            element={<PersonalDataForm onSubmit={handleSubmit} />}
          />
          <Route path="/company-details" element={<CompanyDetailsForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
