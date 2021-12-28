import React from 'react'
import Card from "@mui/material/Card";

const CustomCard = props => {

    // MUI-Card Components' own attributes. Plus functions
    const configCard = {
        variant: "outlined",
        sx: {
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
            padding: "1rem",
            overflow: "hidden",
            minWidth: "150px",
        }
    };

    return (
        <Card {...configCard} sx={props.sx}>
            {props.children}
        </Card>
    )
}

export default CustomCard
