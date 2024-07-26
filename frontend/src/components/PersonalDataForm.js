import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Container,
  Paper,
  LinearProgress
} from '@mui/material';

const PersonalDataForm = ({ onSubmit, initialData }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    countryCode: Yup.string().required('Country code is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    gender: Yup.string().required('Gender is required'),
  });

  return (
    <Container maxWidth="sm"  >
      <Paper elevation={3} sx={{ p: 4, mt: 4, backgroundColor: '#f5f5f5' }}>
        <Box sx={{ mb: 2 }}>
          <LinearProgress variant="determinate" value={50} sx={{ height: 10, borderRadius: 5  }} />
        </Box>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: 'black' }}>
          Personal Data
        </Typography>
        <Formik
          initialValues={{ name: '', countryCode: '', phone: '', address: '', gender: '', ...initialData }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            onSubmit(values);
            navigate('/company-details', { state: { personalData: values } });
          }}
        >
          {({ errors, touched, isValid, dirty, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="name"
                label="Name *"
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="country-code-label">Country Code *</InputLabel>
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
                  fullWidth
                  margin="normal"
                  name="phone"
                  label="Phone"
                  error={touched.phone && errors.phone}
                  helperText={touched.phone && errors.phone}
                />
              </Box>
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="address"
                label="Address *"
                error={touched.address && errors.address}
                helperText={touched.address && errors.address}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="gender-label">Gender *</InputLabel>
                <Field
                  as={Select}
                  labelId="gender-label"
                  name="gender"
                  label="Gender *"
                  error={touched.gender && errors.gender}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Field>
                {touched.gender && errors.gender && (
                  <Typography color="error" variant="caption">
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#FFD700',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#FFC700',
                    },
                  }}
                  disabled={!(isValid && dirty) || isSubmitting}
                >
                  Continue
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default PersonalDataForm;