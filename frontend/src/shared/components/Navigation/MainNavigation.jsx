// Third party imports
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

// Custom imports
import SideDrawer from "./SideDrawer";
import { logoutUser, selectLogin } from '../../../store/loginSlice'



const LinkTab = props => {
  
  return (
    <Tab
      component={Link}
      disableRipple
      sx={{
        height: "5.5rem",
        margin: {
          tablet: 'auto 0',
          laptop: "auto 0.5rem"
        },
        "&:hover": {
          color: "#f8df00",
          transform: {
            tablet: 'scale(1.25)',
            laptop: 'scale(1.5)'
          }
        },
      }}
      {...props}
    />
  )
}


const MainNavigation = (props) => {
  // From Redux
  const login = useSelector(selectLogin)
  const dispatch = useDispatch()

  // State management
  const [tabValue, setTabValue] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  
  // Handler functions
  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleLogout = () => {
    dispatch(logoutUser())
    setDrawerOpen(false);
  }

   
    return (
      <AppBar position='static' color='secondary' sx={{height: '5rem'}} >
        <Toolbar sx={{justifyContent: 'space-between', alignItems:'center'}}>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleDrawerOpen}
            sx={{
              marginRight: '1rem',
              display: {
                mobile: 'block',
                tablet: 'none',
                laptop: 'none'
              }
            }}
          >
            <MenuIcon
              sx={{ width: '3rem', height: '3rem'}}
            />
          </IconButton>
          <Typography variant='h5' sx={{ fontWeight: 700 }}>
            <Link
              to='/'
              style={{textDecoration: "none", color: 'inherit'}}
            >
             MERNPlaces
            </Link>
          </Typography>
          <Tabs
            centered
            value={tabValue}
            onChange={handleChange}
            textColor='white'
            indicatorColor='primary'
            sx={{
              backgroundColor: 'primary',          
              width: {
                tablet: '60%',
                laptop: '40%'
              },
              display: {
                mobile: 'none',
                tablet: 'block',
                laptop: 'block'
              }
            }}
          >
            <LinkTab label='all users' to='/' />
            {login.loggedIn && <LinkTab label='my places' to='/u1/places' />}
            {login.loggedIn && <LinkTab label='add place' to='/places/new' />}
            {!login.loggedIn && <LinkTab label='authenticate' to='/authenticate' />}
            {login.loggedIn && <LinkTab label='logout' to='/authenticate' onClick={handleLogout} />}
          </Tabs>
          <SideDrawer
            open={drawerOpen}
            onClose={handleDrawerClose}
            value={tabValue}
            onChange={handleChange}
            onLogout={handleLogout}
          />
        </Toolbar>
      </AppBar>
    );
  };
  
  export default MainNavigation;
  

