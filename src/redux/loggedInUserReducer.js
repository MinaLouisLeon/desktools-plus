import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn : false,
    userInfo : {}
}

const loggedInUserReducer = createSlice({
    name : 'loggedInUserReducer',
    initialState,
    reducers : {
        actionUserLoggedIn : (state,payload) => {
            state.isLoggedIn = true;
            state.userInfo = payload
        },
        actionUserLogOut : (state,payload) => {
            state.isLoggedIn = false;
            state.userInfo = {}
        }
    }
})

export const {actionUserLoggedIn,actionUserLogOut} = loggedInUserReducer.actions;
export default loggedInUserReducer.reducer;