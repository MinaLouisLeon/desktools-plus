import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    inputValue : ""
}

const calculatorReducer = createSlice({
    name : "calculatorReducer",
    initialState,
    reducers : {
        actionSaveInput : (state,action) => {
             state.inputValue = action.payload
        }
    }
})

export const {actionSaveInput} = calculatorReducer.actions;
export default calculatorReducer.reducer;