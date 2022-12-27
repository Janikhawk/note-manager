import {configureStore} from '@reduxjs/toolkit'
import {directorySlice} from "./reducers/directory-slice";

export const store = configureStore({
    reducer: {
        [directorySlice.name]: directorySlice.reducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(directoryApi.middleware),
})