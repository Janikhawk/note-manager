import {configureStore} from '@reduxjs/toolkit'
import {directorySlice} from "./directory-slice";

export const store = configureStore({
    reducer: {
        [directorySlice.name]: directorySlice.reducer,
    },
})