import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  LinearProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const CompanyDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const personalData = location.state?.personalData || {};

  const validationSchema = Yup.object({
    positionInCompany: Yup.string().required("Position is required"),
    companyName: Yup.string().required("Company name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    countryCode: Yup.string(), // Remove required
    contactNumber: Yup.string().matches(
      /^[0-9]{10}$/,
      "Contact number must be 10 digits"
    ), // Remove required
    availabilityStartDate: Yup.date().required("Start date is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = { ...personalData, ...values };
      console.log("Submitting form data:", formData);
      const response = await axios.post(
        "http://localhost:5001/api/contact",
        formData
      );
      console.log("Server response:", response.data);

      if (response.data.emailSent) {
        alert("Form submitted successfully and confirmation email sent!");
      } else {
        alert(
          "Form submitted successfully, but there was an issue sending the confirmation email."
        );
      }

      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
        alert(
          `An error occurred while submitting the form: ${error.response.data.error}`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response received from the server. Please try again.");
      } else {
        console.error("Error setting up request:", error.message);
        alert(
          "An error occurred while setting up the request. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        background:
          "linear-gradient(to bottom, #FFFF80 0%, #FFFF80 40%, #FFFF80 40%, #FFFF80 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        pt: 4,
        pb: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, mx: 2, backgroundColor: "#f5f5f5" }}>
        <Box sx={{ mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#FFA500",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#FFD700",
              },
            }}
          />
        </Box>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ color: "#333" }}
        >
          Company Details
        </Typography>
        <Formik
          initialValues={{
            positionInCompany: "",
            companyName: "",
            email: "",
            countryCode: "",
            contactNumber: "",
            availabilityStartDate: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, dirty, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="positionInCompany"
                label="Position in Company *"
                error={touched.positionInCompany && errors.positionInCompany}
                helperText={
                  touched.positionInCompany && errors.positionInCompany
                }
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="companyName"
                label="Company Name *"
                error={touched.companyName && errors.companyName}
                helperText={touched.companyName && errors.companyName}
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="email"
                label="Email *"
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl margin="normal" sx={{ width: "30%" }}>
                  <InputLabel id="country-code-label">Country Code</InputLabel>
                  <Field
                    as={Select}
                    labelId="country-code-label"
                    name="countryCode"
                    label="Country Code *"
                    error={touched.countryCode && errors.countryCode}
                  >
                    <MenuItem value="+1">+1 (USA)</MenuItem>
                    <MenuItem value="+44">+44 (UK)</MenuItem>
                    <MenuItem value="+91">+91 (India)</MenuItem>
                    {/* Add more country codes as needed */}
                  </Field>
                </FormControl>
                <Field
                  as={TextField}
                  margin="normal"
                  name="contactNumber"
                  label="Contact Number"
                  error={touched.contactNumber && errors.contactNumber}
                  helperText={touched.contactNumber && errors.contactNumber}
                  sx={{ width: "70%" }}
                />
              </Box>
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="availabilityStartDate"
                label="Availability Start Date *"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={
                  touched.availabilityStartDate && errors.availabilityStartDate
                }
                helperText={
                  touched.availabilityStartDate && errors.availabilityStartDate
                }
              />
              <Box
                sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/personal-data")}
                  sx={{ color: "#FFD700", borderColor: "#FFD700" }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFD700",
                    color: "#000",
                    "&:hover": {
                      backgroundColor: "#FFC700",
                    },
                  }}
                  disabled={!(isValid && dirty) || isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default CompanyDetailsForm;
