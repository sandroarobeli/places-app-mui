// Third party imports
import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'


// Custom imports
// None - This field intentionally left empty


const DeleteModal = (props) => {
    
  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={props.open}
        onClose={props.onClose}
        transitionDuration={500}
        scroll='body'
        sx={{
          margin: 'auto',
          width: {
            mobile: '95%',
            tablet: '80%',
            laptop: '65%'
          }
        }}
      >
        <DialogTitle
          onClose={props.onClose}
          sx={{
            background: "#2a006e",
            color: "white",
            padding: {
              tablet: "1rem 0.5rem"
            },
            "& h2": {
              margin: {
                tablet: "0.5rem" 
              }
            }
          }}
        >
          <Typography
            variant='h5'
            component='h2'
            sx={{
              fontWeight: 600
            }}
          >
            Are you sure?
          </Typography>
        </DialogTitle>
        <DialogContent sx={{backgroundColor: 'white'}}>
          <Typography
            variant='body1'
            component='p'
            sx={{
              margin: '1rem auto',
              textAlign: 'center'
            }}
          >
            Do you want to proceed and delete this place? Note that deletion
            will be permanent.
          </Typography>
        </DialogContent>
        <DialogActions sx={{justifyContent: 'center', backgroundColor: 'white'}}>
          <Button
            variant='outlined'
            onClick={props.cancelDelete}
            sx={{
              color: '#f50057',
              backgroundColor: 'white',
              border: '1px solid #f50057',
              "&:hover": {
                color: "white",
                backgroundColor: '#f50057',
                border: '1px solid #f50057'
              },
              marginRight: '1rem'
            }}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={props.confirmDelete}
            sx={{
              color: "white",
              background: "#830000",
              "&:hover": {
                background: "#f34343"
              },
              
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    );
};


export default DeleteModal;
  