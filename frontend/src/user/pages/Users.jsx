import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const Users = () => {
  // State management
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [backendError, setBackendError] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Redux will handle this if used
  const [loadedUsers, setLoadedUsers] = useState([])

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/`)
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        setIsLoading(false)
        setLoadedUsers(responseData.users)
      } catch (error) {
        setIsLoading(false)
        setBackendError(error.message)
      }
    }

    sendRequest()
}, [])

  // Handler functions
  // Closes Error Modal
  const handleErrorModalClose = () => {
    setOpenErrorModal(false)
    setBackendError('')
  }

  return (
    <React.Fragment>
      {isLoading &&
        <LoadingSpinner
        text='Loading Users...'
        size='10rem'
        thickness={4.5}
        color="#f8df00"
      />
      }
      <UsersList items={loadedUsers} />
      <ErrorModal
        open={!!backendError}  // turns truthy error.message string into boolean
        errorMessage={backendError}  // display backendError on ErrorModal
        onClose={handleErrorModalClose}
        clearModal={handleErrorModalClose}
      />
    </React.Fragment>
    );
};

export default Users;
