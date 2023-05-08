import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {configureStore} from "@reduxjs/toolkit";
import loggedInUserReducer from "./redux/loggedInUserReducer";
import AppsReducer from "./redux/AppsReducer";
import calculatorReducer from "./redux/calculatorReducer";
import settingsReducer from "./redux/settingsReducer";
import taxReducer from "./redux/taxReducer";
const reducers = combineReducers({
    loggedInUserReducer,
    AppsReducer,
    calculatorReducer,
    settingsReducer,
    taxReducer,
});

const persistConfig = {
    key : "root",
    storage,
    whitelist : ['loggedInUserReducer','AppsReducer','calculatorReducer','settingsReducer','taxReducer']
}

const persistedReducer = persistReducer(persistConfig,reducers);

export const store = configureStore({
    reducer : persistedReducer,
    devTools : true
})