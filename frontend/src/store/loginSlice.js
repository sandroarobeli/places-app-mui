import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        value: {
            loggedIn: false
        }
    },
    reducers: {
        loginUser: (state, action) => {
            return {
                value: {
                    ...state,
                    loggedIn: true
                }
            }
        },
        logoutUser: (state, action) => {
            return {
                value: {
                    ...state,
                    loggedIn: false
                }
            }
        }
    }
})


export const { loginUser, logoutUser } = loginSlice.actions

export const selectLogin = (state) => state.login.value

export default loginSlice.reducer