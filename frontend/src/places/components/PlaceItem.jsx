import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar'

import MapModal from "../../shared/components/UIElements/MapModal";
import DeleteModal from "../../shared/components/UIElements/DeleteModal";
import Snackbar from '../../shared/components/UIElements/Snackbar'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { selectId, selectToken } from '../../store/loginSlice'

const PlaceItem = (props) => {
  // From Redux
  const loggedUser = useSelector(selectId)
  const token = useSelector(selectToken)

  // State management module
  const [openMap, setOpenMap] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [backendError, setBackendError] = useState('')
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false) // Redux will handle this if used

  // Handler functions
  const handleMapOpen = () => {
    setOpenMap(true)
  }

  const handleMapClose = () => {
    setOpenMap(false)
  }

  const handleDeleteModalOpen = () => {
    setOpenDeleteModal(true)
  }

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false)
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

  const handleDelete = async () => {
    setOpenDeleteModal(false);
    setIsLoadingSpinner(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        mode: 'cors',
      })
      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message)
      }
      setIsLoadingSpinner(false)
      props.onDelete(props.id) // Goes all the way to the top to filter deleted place out of array
      setOpenSnackbar(true);
    } catch (error) {
      setIsLoadingSpinner(false)
      setBackendError(error.message)
    }
  }

  return (
    <Grid
      item
      sx={{
        width: {
          mobile: '95%',
          tablet: '80%',
          laptop: '60%'
        }
      }}
    >
     <Card
        sx={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
          borderRadius: "6px",
          overflow: "hidden",
          minWidth: "345px",
          backgroundColor: 'white'
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
        <CardActionArea>
        <CardMedia
          component={
            () =>
              <Avatar
                variant='square'
                src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
                alt={props.title}
                title={props.title}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  height: {
                    mobile: '12.5rem',
                    tablet: '25rem'
                  }
                }}
              />
            }
          />
          <CardContent>
            <Typography
              variant='h5'
              component='h2'
              sx={{
                marginBottom: '1rem',
                fontWeight: 700
              }}
            >
              {props.title}
            </Typography>
            <Typography
              variant='h6'
              component='h3'
              color='textSecondary'
              sx={{
                marginBottom: '1rem'
              }}
            >
              {props.address}
            </Typography>
            <Typography
              variant='body1'
              component='p'
              color='textSecondary'
              sx={{
                marginBottom: '0.5rem'
              }}
            >
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
           padding: {
              mobile: '0.5rem',
              tablet: '1.5rem'
            },
            borderTop: "1px solid #ccc",
            justifyContent: "center",
          }}
        >
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleMapOpen}
            sx={{
              margin: {
                mobile: '0.25rem',
                tablet: '0.5rem'
              },
              color: 'secondary',
              "&:hover": {
                color: "white",
                backgroundColor: '#f50057'
              }
            }}
          >
            View on map
          </Button>
          {loggedUser === props.creatorId && <Button
            variant='contained'
            color='secondary'
            component={Link}
            to={`/places/${props.id}`}
            sx={{
              margin: {
                mobile: '0.25rem',
                tablet: '0.5rem'
              },
              "&:hover": {
                background: "#ff4382"
              }
            }}
          >
            Edit
          </Button>}
          {loggedUser === props.creatorId && <Button
            variant='contained'
            onClick={handleDeleteModalOpen}
            sx={{
              margin: {
                mobile: '0.25rem',
                tablet: '0.5rem'
              },
              color: "white",
              background: "#830000",
              "&:hover": {
                background: "#f34343"
              }
            }}
          >
            Delete
          </Button>}
        </CardActions>
      </Card>
      <MapModal
        address={props.address}
        coordinates={props.coordinates}
        open={openMap}
        handleClose={handleMapClose}
      />
      <DeleteModal
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        cancelDelete={handleDeleteModalClose}
        confirmDelete={handleDelete}
      />
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
        Place deleted!
      </Snackbar>
      <ErrorModal
        open={!!backendError}  // turns truthy error.message string into boolean
        errorMessage={backendError}  // display backendError on ErrorModal
        onClose={handleErrorModalClose}
        clearModal={handleErrorModalClose}
      />
    </Grid>
  )
};

export default PlaceItem;
