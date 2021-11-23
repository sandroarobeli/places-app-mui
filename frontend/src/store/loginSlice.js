import { createSlice } from '@reduxjs/toolkit'

// BEFORE GOING BACK TRY REDOING THE STORE PROPS (KEEPING ONLY TOKEN AND ACCESSING user_id via)
// (token.userId)


export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        token: null,
        isLoggedIn: false
    },
    reducers: {
        loginUser: (state, action) => {
           return {
                ...state,
                token: action.payload,
                isLoggedIn: true
            }
        },
        logoutUser: (state, action) => {
            return {
                ...state,
                token: null,
                isLoggedIn: false
            }
        }
    }
})


export const { loginUser, logoutUser } = loginSlice.actions

export const selectToken = (state) => state.login.token
export const selectIsLoggedIn = (state) => state.login.isLoggedIn

export default loginSlice.reducer