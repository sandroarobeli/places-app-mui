import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loggedIn: false,
        user_id: '',
        token: null
    },
    reducers: {
        loginUser: (state, action) => {
            state.loggedIn = true
            state.user_id = action.payload.userId
            state.token = action.payload.token
        },
        logoutUser: (state, action) => {
            state.loggedIn = false
            state.user_id = ''
            state.token = null
        }
    }
})


export const { loginUser, logoutUser } = loginSlice.actions

export const selectLogin = (state) => state.login.loggedIn
export const selectId = (state) => state.login.user_id
export const selectToken = (state) => state.login.token


export default loginSlice.reducer