// Third party imports
import React from "react";
import Grid from "@mui/material/Grid";

// Custom imports
import UserItem from "./UserItem";



const UsersList = (props) => {
   return (
        <Grid container spacing={2} sx={{width: "90%", margin: 'auto'}}>
            {
                props.items.map(user =>
                    <UserItem
                        key={user.id}
                        id={user.id}
                        image={user.image}
                        name={user.name}
                        placeCount={user.places.length}
                    />)
            }
        </Grid>
    )
};
  
export default UsersList;
  
