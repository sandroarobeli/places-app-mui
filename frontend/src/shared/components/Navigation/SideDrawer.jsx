import React from "react"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Drawer from '@mui/material/Drawer'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { selectLogin, selectId } from '../../../store/loginSlice'

const LinkTab = (props) => {
  return (
    <Tab
      component={Link}
      disableRipple
      sx={{
        color: 'white',
        margin: "2rem 0",
        "&:hover": {
          color: "#f8df00",
          transform: "scale(1.5)"
        }
      }}
      {...props}
    />
  );
};

const SideDrawer = (props) => {
  // From Redux
  const loggedIn = useSelector(selectLogin)
  const loggedUser = useSelector(selectId)

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={props.open}
        onClose={props.onClose}
        transitionDuration={750}
        elevation={16}
      >
        <Tabs
          orientation="vertical"
          value={props.value}
          onChange={props.onChange}
          textColor="white"
          indicatorColor="primary"
          sx={{ width: "20rem" }}
        >
          <LinkTab label='all users' to='/' onClick={props.onClose} />
          {loggedIn && <LinkTab label='my places' to={`/${loggedUser}/places`} onClick={props.onClose} />}
          {loggedIn && <LinkTab label='add place' to='/places/new' onClick={props.onClose} />}
          {!loggedIn && <LinkTab label='authenticate' to='/authenticate' onClick={props.onClose} />}
          {loggedIn && <LinkTab label='logout' to='/authenticate' onClick={props.onLogout} />}
        </Tabs>
      </Drawer>
    </React.Fragment>
  )
};

export default SideDrawer;
