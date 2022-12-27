import {configureStore} from '@reduxjs/toolkit'
import {directorySlice} from "./directory-slice";
import {noticeSlice} from "./notice-slice";

export const store = configureStore({
    reducer: {
        [directorySlice.name]: directorySlice.reducer,
        [noticeSlice.name]: noticeSlice.reducer,
    },
})