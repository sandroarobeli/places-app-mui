import React from "react";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Grid";
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'

const UserItem = (props) => {
  return (
   <Grid item mobile={12} tablet={6} laptop={4}>
    <Link to={`/${props.id}/places`} style={{textDecoration: 'none'}}>
      <Card
        sx={{
          marginRight: '1rem',
          marginBottom: '1rem',
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
          background: "#292929",
          display: 'flex',
          "&:hover": {
            background: "#ffd900"
          },
          "&:hover h2": {
            color: "#292929"
          },
          "&:hover h3": {
            color: "#292929"
          },
        }}
       >
        <CardMedia
           component={
             () =>
               <Avatar
                 src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
                 alt={props.name}
                 title={props.name}
                 sx={{width: '6rem', height: '6rem', margin: 'auto 5px'}}
               />
              }

      />
        <CardContent>
          <Typography
            variant='h4'
            component='h2'
            sx={{color: "#ffd900", fontFamily: "Fleur De Leah"}}
           >
            {props.name}
          </Typography>
          <Typography
            variant='h5'
            component='h3'
            sx={{color: "white"}}
          >
            {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
          </Typography>
        </CardContent>
      </Card>

    </Link>
  </Grid>
  );
};

export default UserItem;
