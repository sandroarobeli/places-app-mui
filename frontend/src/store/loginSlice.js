import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
       loggedIn: false
    },
    reducers: {
        loginUser: (state, action) => {
            return {
                ...state,
                loggedIn: true
            }
        },
        logoutUser: (state, action) => {
            return {
                ...state,
                loggedIn: false
            }
        }
    }
})


export const { loginUser, logoutUser } = loginSlice.actions

export const selectLogin = (state) => state.login

export default loginSlice.reducer