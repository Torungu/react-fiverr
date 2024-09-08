import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSignUpOpen: false,
    isSignInOpen: false

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        openSignUpForm: (state, action) => {
            state.isSignUpOpen = action.payload;
        },
        openSignInForm: (state, action) => {
            state.isSignInOpen = action.payload;
        }
    }
});

export const { openSignUpForm, openSignInForm } = authSlice.actions

export default authSlice.reducer