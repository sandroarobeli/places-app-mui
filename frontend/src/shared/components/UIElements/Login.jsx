// Third party imports
import React, { useState } from "react";
import { useHistory } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form } from "formik";
import { object, string } from "yup";
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

// Custom imports
import TextField from './TextField'
import Button from './Button'
import ErrorModal from "./ErrorModal";
import { loginUser, selectId, selectToken } from '../../../store/loginSlice'



// ValidationSchema
const validationSchema = object({
    email: string().email("Enter a valid Email").required("Email is required"),
    password: string()
      .min(8, "Password must contain at least 8 characters")
      .matches(/^(?:(?!password).)*$/gi, "Cannot contain the word 'password'")
      .required("Enter a valid password")
});


const Login = () => {
  const history = useHistory() 
  // State management
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [backendError, setBackendError] = useState('')
  
  // From redux
  const loggedUser = useSelector(selectId)
  const token = useSelector(selectToken)
  const dispatch = useDispatch()

  const initialFormState = {
    email: "",
    password: ""
  }

  // Handler functions
  // Saves userId & token into localStorage, ensures surviving page reloads 
  const setLocalStorage = (userId, token) => {
    localStorage.setItem('userData', JSON.stringify({ userId: userId, token: token }))
  }

  
  // Submits data to the server
  const submitHandler = async (values, actions) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({  // body has to be in JSON format!
          email: values.email,
          password: values.password
        })   
      })
      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message)
      }
      console.log('responseData:')
      console.log(responseData) // test
      actions.resetForm(initialFormState);  // actions.setSubmitting(false) not needed with async
    //  dispatch(loginUser(responseData.userId))
      //test start
      dispatch(loginUser({
        userId: responseData.userId,
        token: responseData.token,
      }))

      // Invokes setLocalStorage function 
      setLocalStorage(responseData.userId, responseData.token)
      
      // console.log('loggedUser')
      // console.log(loggedUser)
      // console.log('token')
      // console.log(token)
      // test end
      history.push(`/${loggedUser}/places`) // test
    } catch (error) {
      // errors ans setErrors for Formik have to do with frontend Form validation, not backend!
      // Thats why backend errors are handled as a separate state variable here  
      setBackendError(error.message)
    }
  }
  
  // Closes Error Modal
  const handleErrorModalClose = () => {
    setOpenErrorModal(false)
    setBackendError('')
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
                  Login Required
                </Typography>
              </Grid>
              <Grid item mobile={12}>
                <Divider variant='fullWidth'/>
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
                  Login
                </Button>
              </Grid>
            </Grid>
            <ErrorModal
              open={!!backendError}  // turns truthy error.message string into boolean
              errorMessage={backendError}  // display backendError on ErrorModal
              onClose={handleErrorModalClose}
              clearModal={handleErrorModalClose}
            />
          </Form>
        )
      }
    </Formik>
  );
};
  
export default Login;