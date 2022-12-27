import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getDirectories} from "../../services/note-service";

const initialState = {
    numOfFolders: 0,
    directories: [],
    status: 'idle'
};

export const fetchDirectories = createAsyncThunk('directories/getDirectories', async () => {
    const response = await getDirectories();
    return response;
});

export const folderSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        increment: (state) => {
            state.numOfFolders += 1;
            console.log(state)
        },
        decrement: (state) => {
            state.numOfFolders -= 1;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDirectories.pending, (state, action) => {
                state.status = 'loading';
                return action.payload;
            })
            .addCase(fetchDirectories.fulfilled, (state, action) => {
                state.status = 'idle';
                state.directories = action.payload;
                state.numOfFolders = action.payload.length;
            })
    }
});

export const { increment, decrement } = folderSlice.actions;

