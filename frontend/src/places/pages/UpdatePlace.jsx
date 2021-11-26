// Third party imports
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Formik, Form } from "formik"
import { object, string } from "yup";
import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";

// Custom imports
import TextField from '../../shared/components/UIElements/TextField'
import Button from '../../shared/components/UIElements/Button'
import Snackbar from '../../shared/components/UIElements/Snackbar'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { selectId, selectToken } from '../../store/loginSlice'

// ValidationSchema
const validationSchema = object({
  title: string().required("Title required"),
  description: string().required('Description required')
    .min(5, "Description must contain at least 5 characters"),
  address: string().required("Address required")
});


const UpdatePlace = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [backendError, setBackendError] = useState('')
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false) // Redux will handle this if used
  const [initialFormState, setInitialFormState] = useState({ title: '', description: '', address: ''})
  
  // Access to the dynamic segments
  const placeId = useParams().placeId;
  
  // From Redux
  const loggedUser = useSelector(selectId)
  const token = useSelector(selectToken)

  // History module
  const history = useHistory()
  
  // Pre-loads title, description and address of the place to be edited
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoadingSpinner(true)
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/places/${placeId}`)
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)    
        }
        setIsLoadingSpinner(false)
        setInitialFormState({ title: responseData.place.title, description: responseData.place.description, address: responseData.place.address })
      } catch (error) {
        setIsLoadingSpinner(false)
        setBackendError(error.message)
      }
    }

    sendRequest()
  },[placeId])
  
  
  // Handler functions
  // Submits data to the server
  const submitHandler = async (values, actions) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/places/${placeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        mode: 'cors',
        body: JSON.stringify({
          title: values.title,
          description: values.description
        })
      })
      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message)    
      }
      setOpenSnackbar(true);
     // setInitialFormState({ title: '', description: '', address: ''})
      //actions.resetForm(initialFormState);  // actions.setSubmitting(false) not needed with async
      history.push(`/${loggedUser}/places`)
    } catch (error) {
       // errors ans setErrors for Formik have to do with frontend Form validation, not backend!
       // Thats why backend errors are handled as a separate state variable here  
       setBackendError(error.message)
    }
  }
  
  
  // Manages snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
        return
    }
    setOpenSnackbar(false)
  }
  
  // Closes Error Modal
  const handleErrorModalClose = () => {
    setOpenErrorModal(false)
    setBackendError('')
  }
  
  return (
    <Container
      sx={{
        width: {
            mobile: '95%',
            tablet: '80%',
            laptop: '70%'
          },
        maxWidth: '40rem',
        margin: '1rem auto',
        padding: '2rem',
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
        borderRadius: "6px",
        backgroundColor: "white",
        textAlign: "center"
      }}
    >
      {isLoadingSpinner &&
        <LoadingSpinner
          text='Loading Place...'
          size='10rem'
          thickness={4.5}
          color="#f8df00"
        />
      }
      <Formik
        initialValues={initialFormState}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
        enableReinitialize // allows pre-populating textFields upon component load 
      >
        {
          ({ isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
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
                    Title
                  </Typography>
                </Grid>
                <Grid item mobile={12}>
                  <TextField
                    name='title'
                    label='Title'
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
                    Description
                  </Typography>
                </Grid>
                <Grid item mobile={12}>
                  <TextField
                    name='description'
                    label='Description'
                    multiline
                    rows={3}
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
                    Address
                  </Typography>
                </Grid>
                <Grid item mobile={12}>
                  <TextField
                    name='address'
                    label="Address"
                    type='text'
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
                    sx={{
                      marginTop: '1rem',
                      "&:hover": {
                        background: "#ff4382"
                      }
                    }}
                  >
                    Update Place
                  </Button>
                </Grid>
                <Grid item mobile={12}>
                  <Snackbar
                    open={openSnackbar}
                    onClose={handleClose}
                    sx={{
                        width: {
                        mobile: '80%',
                        tablet: '30%',
                        laptop: '25%'
                        },
                        backgroundColor: '#ff4382'
                    }}
                  >
                    Place updated!
                  </Snackbar>
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
    </Container>
  )
};
  
export default UpdatePlace;
  