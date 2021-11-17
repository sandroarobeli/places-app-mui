import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loggedIn: false,
        user_id: ''
    },
    reducers: {
        loginUser: (state, action) => {
           return {
                ...state,
                loggedIn: true,
                user_id: action.payload
            }
        },
        logoutUser: (state, action) => {
            return {
                ...state,
                loggedIn: false,
                user_id: ''
            }
        }
    }
})


export const { loginUser, logoutUser } = loginSlice.actions

export const selectLogin = (state) => state.login.loggedIn
export const selectId = (state) => state.login.user_id

export default loginSlice.reducer