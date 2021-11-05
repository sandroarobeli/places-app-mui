// Third party imports
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form } from "formik"
import { object, string } from "yup";
import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";

// Custom imports
import CustomCard from "../../shared/components/UIElements/CustomCard";
import TextField from '../../shared/components/UIElements/TextField'
import Button from '../../shared/components/UIElements/Button'
import Snackbar from '../../shared/components/UIElements/Snackbar'

// ValidationSchema
const validationSchema = object({
  title: string().required("Title required"),
  description: string().required('Description required')
    .min(5, "Description must contain at least 5 characters"),
  address: string().required("Address required")
});



// Temporary container for dummy data
const PLACES = [
    {
      id: "p1",
      title: "Empire state building",
      description: "One of the most skyscrapers in the world",
      imageUrl:
        "https://media.istockphoto.com/photos/new-york-city-skyline-picture-id486334510?k=6&m=486334510&s=612x612&w=0&h=qMsSuzsZcCtSEZyhnEsJsQvRSx-feldCQAOR9D9mVas=",
      address: "20 W 34th St, New York, NY 10001",
      creator: "u1",
      location: {
        lat: 40.7484,
        lng: -73.9857
      }
    },
    {
      id: "p2",
      title: "Leaning tower of Pisa",
      description: "Leaning tower structure in the city of Pisa,Italy",
      imageUrl:
        "https://cdn.britannica.com/88/80588-050-8D944BFE/Leaning-Tower-of-Pisa-Italy.jpg",
      address: "Piazza del Duomo, 56126 Pisa PI, Italy",
      creator: "u1",
      location: {
        lat: 43.723,
        lng: 10.3966
      }
    },
    {
      id: "p3",
      title: "Le Louvre",
      description: "The Louvre museum in Paris, France",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Louvre_Courtyard%2C_Looking_West.jpg/805px-Louvre_Courtyard%2C_Looking_West.jpg",
      address: "Rue de Rivoli, 75001 Paris, France",
      creator: "u2",
      location: {
        lat: 48.8606,
        lng: 2.3376
      }
    }
  ];


const UpdatePlace = (props) => {
  const [openSnackbar, setOpenSnackbar] = useState(false)

  // Access to the dynamic segments
  const placeId = useParams().placeId;
  
  // Forthcoming server call goes here
  const identifiedPlace = PLACES.find((place) => place.id === placeId);
  
  // To avoid undefined results when non-existent placeId somehow gets generated
  const initialFormState =
    !identifiedPlace ?
      {
        title: '',
        description: '',
        address: ''
      }
      :
      {
        title: identifiedPlace.title,
        description: identifiedPlace.description,
        address: identifiedPlace.address
      }
   

  // Handler functions
  // Submits data to the server
  const submitHandler = (values, actions) => {
      setTimeout(() => {
        // setSubmitting not needed with async
        actions.setSubmitting(false);
        actions.resetForm(initialFormState);
        setOpenSnackbar(true);
        console.log(values); // test
    }, 2000)
  }
  // Manages snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
        return
    }
    setOpenSnackbar(false)
  }
  
  if (!identifiedPlace) {
    return (
      <CustomCard
        sx={{
          margin: '3rem auto',
          padding: '1rem 4rem',
          textAlign: 'center',
          maxWidth: '375px',
          background: 'white'
        }}
      >
        <Typography
          variant='h4'
          component='h4'
        >
          Place could not be found.
        </Typography>
      </CustomCard>
    )    
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
            </Form>
          )
        }
      </Formik>
    </Container>
  )
};
  
export default UpdatePlace;
  