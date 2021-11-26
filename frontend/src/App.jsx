// Third party imports
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline'

// Custom imports
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authenticate from "./user/pages/Authenticate";
import { selectLogin, loginUser } from './store/loginSlice'


// Custom theme module. Override default colors, breakpoints etc. to match customer' requirements
const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 641,
      laptop: 1008
    }
  },
  palette: {
    primary: {
      main: "#f8df00" 
    },
    secondary: {
      main: "#f50057"
    },
    background: {
      default: "#4d4d4d",
      paper: "#4d4d4d"
    },
  }
})


const Main = (props) => {
  // From Redux
  const loggedIn = useSelector(selectLogin)
  const dispatch = useDispatch()
 
  // Main as part of App loads first. In our case that happens on every reload
  // Thus, we check if the user is logged in (localStorage saves userId and token upon LOGGING-IN &
  // SIGNING-UP) and if so, restore the user's privileges
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    
    if (storedData && storedData.token) {
      // If storedData exists & it has token property, we dispatch loginUser to redux store
      dispatch(loginUser({
        userId: storedData.userId,
        token: storedData.token
      }))
    }
  }, [dispatch])
  

  // Locking down available routes depending on User's logged in/out status
  let routes
  if (loggedIn) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/places/new' exact >
          <NewPlace />  
        </Route>
        <Route path='/places/:placeId' exact>
          <UpdatePlace />      
        </Route>
        <Redirect to='/' />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/authenticate' exact>
          <Authenticate />
        </Route>
        <Redirect to='/authenticate' />
      </Switch>
    )
  }

  return (
    <Router>
      <MainNavigation /> 
      {routes}
    </Router>
  )
}

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main {...props} />
    </ThemeProvider>
  );
}

export default App;