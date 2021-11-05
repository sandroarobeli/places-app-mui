// Third party imports
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button'

// Custom imports
import Login from '../../shared/components/UIElements/Login'
import Signup from "../../shared/components/UIElements/Signup";

const Authenticate = (props) => {
    // State management module
    const [loginMode, setLoginMode] = useState(true)

    // Handler functions
    // Switches between Login & Signup modes
    const switchModeHandler = () => {
        setLoginMode((prevMode) => !prevMode)
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
            {loginMode ? <Login /> : <Signup />}
            <Button
                fullWidth
                variant='outlined'
                color='secondary'
                onClick={switchModeHandler}
                sx={{
                    marginTop: '1rem',
                    "&:hover": {
                        color: "white",
                        backgroundColor: '#f50057'
                    }
                }}
            >
                Switch to {loginMode ? "Signup" : "Login"}
            </Button>
        </Container>
    );
};
  
export default Authenticate;
  