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
        }
    }
})

export const {actionUserLoggedIn} = loggedInUserReducer.actions;
export default loggedInUserReducer.reducer;