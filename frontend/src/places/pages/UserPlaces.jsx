// Third party imports
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";


// Custom imports
import PlaceList from "../components/PlaceList";
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { selectId } from '../../store/loginSlice'

const UserPlaces = () => {
  // From redux
  const loggedUser = useSelector(selectId)
  
  // Access to the dynamic segments
  const userId = useParams().userId;
  // State management
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [userPlaces, setUserPlaces] = useState([])
  const [backendError, setBackendError] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Redux will handle this if used

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/places/user/${userId}`)
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)    
        }
        console.log(responseData.places) //test
        setIsLoading(false)
        setUserPlaces(responseData.places)
      } catch (error) {
        setIsLoading(false)
        setBackendError(error.message)
     }
    }
    
    sendRequest()
  }, [userId])

  // Handler functions
  // Closes Error Modal
  const handleErrorModalClose = () => {
    setOpenErrorModal(false)
    setBackendError('')
  }
  
  // Triggers re rendering so the list no longer shows deleted place
  const placeDeleteHandler = (deletedPlaceId) => {
    setUserPlaces(prevState => prevState.filter((place) => place.id !== deletedPlaceId))
  }
  
  return (
    <React.Fragment>
      {isLoading &&
        <LoadingSpinner
          text='Loading Places...'
          size='10rem'
          thickness={4.5}
          color="#f8df00"
        />
      }
      <PlaceList items={userPlaces} userId={userId} loggedUser={loggedUser} onDelete={placeDeleteHandler} />
      <ErrorModal
        open={!!backendError}  // turns truthy error.message string into boolean
        errorMessage={backendError}  // display backendError on ErrorModal
        onClose={handleErrorModalClose}
        clearModal={handleErrorModalClose}
      />
    </React.Fragment>
    
    );
  };
  
  export default UserPlaces;
  

