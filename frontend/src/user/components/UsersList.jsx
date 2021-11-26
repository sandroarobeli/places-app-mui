// Third party imports
import React from "react";
import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Grid";

// Custom imports
import UserItem from "./UserItem";
import CustomCard from "../../shared/components/UIElements/CustomCard";



const UsersList = (props) => {
    if (props.items.length === 0) {
        return (
            <CustomCard sx={{ margin: '3rem auto', textAlign: 'center', maxWidth: '275px', background: 'white'}}>
                <Typography variant='h3' component='h3'>No Users Found</Typography>
            </CustomCard>
                
        )
    }

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
  
