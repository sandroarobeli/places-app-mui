// Third party imports
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form } from "formik";
import { object, string, mixed } from "yup";
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

// Custom imports
import TextField from './TextField'
import Button from './Button'
import ErrorModal from './ErrorModal'
import ImageUpload from './ImageUpload'
import { loginUser, selectId } from '../../../store/loginSlice'


// ValidationSchema
const validationSchema = object({
    name: string().required("Name required"),
    email: string().email("Enter a valid Email").required("Email is required"),
    password: string()
      .min(8, "Password must contain at least 8 characters")
      .matches(/^(?:(?!password).)*$/gi, "Cannot contain the word 'password'")
      .required("Enter a valid password"),
    image: mixed().required()
     
});


const Signup = (props) => {
  // State management
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [backendError, setBackendError] = useState('')
  
  // From redux
  const loggedUser = useSelector(selectId)
  const dispatch = useDispatch()
    
  const initialFormState = {
    name: "",
    email: "",
    password: "",
    image: null
  }

  // Handler functions
  // Submits data to the server
  const submitHandler = async (values, actions) => {
    try {
      let formData = new FormData()
      //  Data inputs via formData (values)
      formData.append('name', values.name) 
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('image', values.image) 
      // Data inputs using formData (values)
      const response = await fetch('http://127.0.0.1:5000/api/users/signup', {
        method: 'POST',
        body: formData
      })
      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message)    
      }
      console.log('ResponseData:') // testing ImageUpload
      console.log(responseData)
      actions.resetForm(initialFormState);  // actions.setSubmitting(false) not needed with async
      dispatch(loginUser(responseData.user.id))
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
        (formProps) => (
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
                <ImageUpload
                  image={formProps.values.image}
                  width='150px'
                  height='150px'
                  handleImageUpload={(event) => {
                    formProps.setFieldValue("image", event.target.files[0]);
                  }}
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
                formProps.isSubmitting && (
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
  
export default Signup;