import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {configureStore} from "@reduxjs/toolkit";
import loggedInUserReducer from "./redux/loggedInUserReducer";
import AppsReducer from "./redux/AppsReducer";
const reducers = combineReducers({
    loggedInUserReducer,
    AppsReducer
});

const persistConfig = {
    key : "root",
    storage,
    whitelist : ['AppsReducer']
}

const persistedReducer = persistReducer(persistConfig,reducers);

export const store = configureStore({
    reducer : persistedReducer,
    devTools : true
})