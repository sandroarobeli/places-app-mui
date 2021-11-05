// Third party imports
import React from "react";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

// Custom imports
import TextField from './TextField'
import Button from './Button'



// ValidationSchema
const validationSchema = object({
    name: string().required("Name required"),
    email: string().email("Enter a valid Email").required("Email is required"),
    password: string()
      .min(8, "Password must contain at least 8 characters")
      .matches(/^(?:(?!password).)*$/gi, "Cannot contain the word 'password'")
      .required("Enter a valid password")
});


const Signup = (props) => {
    
  const initialFormState = {
    name: "",
    email: "",
    password: ""
  }

  // Handler functions
  // Submits data to the server
  const submitHandler = (values, actions) => {
    setTimeout(() => {
      // setSubmitting not needed with async
      actions.setSubmitting(false);
      actions.resetForm(initialFormState);
      console.log(values); // test
    }, 2000)
  }
  

  return (
    <Formik
      initialValues={initialFormState}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {
        ({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item mobile={12}>
                <Typography
                  variant='h3'
                  component='h2'
                  sx={{
                    fontFamily: "Fleur De Leah, cursive",
                    textAlign: 'center',
                    fontWeight: 600
                  }}
                >
                  Sign Up
                </Typography>
              </Grid>
              <Grid item mobile={12}>
                <Divider variant='fullWidth' />
              </Grid>
              <Grid item mobile={12}>
                <Typography
                  variant='h4'
                  component='h3'
                  sx={{
                    fontFamily: "Fleur De Leah, cursive",
                    textAlign: 'left',
                    fontWeight: 600
                  }}
                >
                  Name
                </Typography>
              </Grid>
              <Grid item mobile={12}>
                <TextField
                  name='name'
                  label='Name'
                  type='text'
                />
              </Grid>
              <Grid item mobile={12}>
                <Typography
                  variant='h4'
                  component='h3'
                  sx={{
                    fontFamily: "Fleur De Leah, cursive",
                    textAlign: 'left',
                    fontWeight: 600
                  }}
                >
                  Email
                </Typography>
              </Grid>
              <Grid item mobile={12}>
                <TextField
                  name='email'
                  label='Email'
                  type='email'
                />
              </Grid>
              <Grid item mobile={12}>
                <Typography
                  variant='h4'
                  component='h3'
                  sx={{
                    fontFamily: "Fleur De Leah, cursive",
                    textAlign: 'left',
                    fontWeight: 600
                  }}
                >
                  Password
                </Typography>
              </Grid>
              <Grid item mobile={12}>
                <TextField
                  name='password'
                  label='Password'
                  type='password'
                />
              </Grid>
              {
                isSubmitting && (
                    <Grid item mobile={12}>
                        <LinearProgress />
                    </Grid>
                )
              }
              <Grid item mobile={12}>
                <Button
                  variant='contained'
                  color='secondary'
                  sx={{
                    marginTop: "1rem",
                    "&:hover": {
                      background: "#ff4382"
                    }
                  }}
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }
    </Formik>
  );
};
  
export default Signup;