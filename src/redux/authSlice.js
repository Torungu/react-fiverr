import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage } from '../utils/localStorage';

const initialState = {
    isSignUpOpen: false,
    isSignInOpen: false,
    infoUser: getLocalStorage("user"),
    infoTmp: getLocalStorage("tmpUserData")

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
        },
        getInfoUser: (state, action) => {
            state.infoUser = action.payload;
        },
        getInfoTmp: (state, action) => {
            state.infoTmp = action.payload;
        },
    }
});

export const { openSignUpForm, openSignInForm, getInfoUser, getInfoTmp } = authSlice.actions

export default authSlice.reducer