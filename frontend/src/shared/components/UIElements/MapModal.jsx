// MapModal is customized from original MUI dialog
// Third party imports
import React from "react";
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'

import Map from './Map'

const MapModal = (props) => {
  return (
      <React.Fragment>
        <Dialog
          fullWidth
          open={props.open}
          onClose={props.handleClose}
          transitionDuration={500}
          scroll="body"
          sx={{
            margin: 'auto',
            width: {
              mobile: '100%',
              tablet: '100%',
              laptop: '80%'
            }
          }}
        >
          <DialogTitle
            onClose={props.handleClose}
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
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 600
              }}
            >
              {props.address}
            </Typography>
          </DialogTitle>
          <DialogContent sx={{backgroundColor: 'white'}}>
            <Map center={props.coordinates} zoom={16} />
          </DialogContent>
          <DialogActions sx={{backgroundColor: 'white'}}>
            <Button
              autoFocus
              variant="contained"
              color="secondary"
              onClick={props.handleClose}
              sx={{
                "&:hover": {
                  background: "#ff4382"
                }
              }}
            >
              close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
};

export default MapModal;
