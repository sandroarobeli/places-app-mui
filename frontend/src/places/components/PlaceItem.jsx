// Third party imports
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

// Custom imports
import MapModal from "../../shared/components/UIElements/MapModal";
import DeleteModal from "../../shared/components/UIElements/DeleteModal";
import { selectLogin } from '../../store/loginSlice'



const PlaceItem = (props) => {
  // From Redux
  const login = useSelector(selectLogin)

  // State management module
  const [openMap, setOpenMap] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

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

  const handleDelete = () => {
    console.log(`${props.title} has been deleted!`); //test
    setOpenDeleteModal(false);
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
        <CardActionArea>
          <CardMedia
            image={props.image}
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
              marginRight: {
                mobile: '0.5rem',
                tablet: '1rem'
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
          {login.loggedIn && <Button
            variant='contained'
            color='secondary'
            component={Link}
            to={`/places/${props.id}`}
            sx={{
              margin: {
                mobile: '0.5rem',
                tablet: '1rem'
              },
              "&:hover": {
                background: "#ff4382"
              }
            }}
          >
            Edit
          </Button>}
          {login.loggedIn && <Button
            variant='contained'
            onClick={handleDeleteModalOpen}
            sx={{
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
    </Grid>
    )
};
  
  export default PlaceItem;