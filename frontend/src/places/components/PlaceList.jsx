import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";

import CustomCard from "../../shared/components/UIElements/CustomCard";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
    if (props.items.length === 0) {
        return (
            <CustomCard
                sx={{
                    margin: '3rem auto',
                    padding: '1rem 4rem',
                    textAlign: 'center',
                    maxWidth: {
                        mobile: '350px',
                        tablet: '375px',
                        laptop: '375px'
                    },
                    background: 'white'
                }}
            >
                <Typography variant='h4' component='h4'>No Places Found</Typography>
                {props.userId === props.loggedUser &&
                    <Button
                        variant='contained'
                        color='secondary'
                        component={Link}
                        to='/places/new'
                        sx={{
                            margin: "1rem"
                        }}
                    >
                        Share Place
                    </Button>
                }
            </CustomCard>
        )
    }
    return (
        <Grid
            container
            rowSpacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                textAlign: 'center',
                margin: '0.5rem auto'
            }}
        >
            {
                props.items.map((place) =>
                    <PlaceItem
                        key={place.id}
                        id={place.id}
                        image={place.image}
                        title={place.title}
                        description={place.description}
                        address={place.address}
                        creatorId={place.creator}
                        coordinates={place.location}
                        onDelete={props.onDelete}
                    />)
            }
        </Grid>
    )
};

export default PlaceList;
