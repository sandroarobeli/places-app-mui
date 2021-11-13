import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = (props) => {
    const header = props.text
        ? (<h3 style={{ margin: "0.5rem", color:  props.color}}>{props.text}</h3>)  // "#f8df00"
        : null;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 99
            }}
        >   
            {header}
            <CircularProgress size={props.size} thickness={props.thickness} sx={{ color: props.color }} />  {/* "#f8df00" */}
        </Box>
    )
}

export default LoadingSpinner