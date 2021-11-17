// Third party imports
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Formik, Form } from "formik";
import { object, string } from "yup";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

// Custom imports
import TextField from '../../shared/components/UIElements/TextField'
import Button from '../../shared/components/UIElements/Button'
import Snackbar from '../../shared/components/UIElements/Snackbar'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { selectId } from '../../store/loginSlice'

// ValidationSchema
const validationSchema = object({
    title: string().required("Title required"),
    description: string().required('Description required')
        .min(5, "Description must contain at least 5 characters"),
    address: string().required("Address required")
})



const NewPlace = () => {
    // State management
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openErrorModal, setOpenErrorModal] = useState(false)
    const [backendError, setBackendError] = useState('')

    // From Redux
    const loggedUser = useSelector(selectId)

    const history = useHistory()

    const initialFormState = {
        title: "",
        description: "",
        address: ""
    }
    console.log(loggedUser) // test
    // Handler functions
    // Submits data to the server
    const submitHandler = async (values, actions) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/places/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify({    // body has to be in JSON format!
                    title: values.title,
                    description: values.description,
                    address: values.address,
                    creator: loggedUser
                })
            })
            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.message)    
            }
            console.log(responseData)
            setOpenSnackbar(true);
            actions.resetForm(initialFormState);  // actions.setSubmitting(false) not needed with async
            history.push('/')
        } catch (error) {
            // errors ans setErrors for Formik have to do with frontend Form validation, not backend!
            // Thats why backend errors are handled as a separate state variable here  
            setBackendError(error.message)
        }
    }


    // Manages snackbar
    const handleSnackbarClose = (event, reason) => {
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
                                        Add Place
                                    </Button>
                                </Grid>
                                <Grid item mobile={12}>
                                    <Snackbar
                                        open={openSnackbar}
                                        onClose={handleSnackbarClose}
                                        sx={{
                                            width: {
                                                mobile: '80%',
                                                tablet: '30%',
                                                laptop: '25%'
                                            },
                                            backgroundColor: '#ff4382'
                                        }}
                                    >
                                        New place added!
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
  
  export default NewPlace;