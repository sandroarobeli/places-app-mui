// Third party imports
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux' 
// Custom imports
import UsersList from "../components/UsersList";
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { selectId } from '../../store/loginSlice'   

const Users = () => {
  // State management
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [backendError, setBackendError] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Redux will handle this if used
  const [loadedUsers, setLoadedUsers] = useState([])

  // From Redux
  const loggedUser = useSelector(selectId)

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://127.0.0.1:5000/api/users/')
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)    
        }
        console.log('Current users ID: ')
        console.log(loggedUser) // test reads from response
        console.log(responseData.users)
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
  


