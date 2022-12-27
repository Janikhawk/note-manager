import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {createDirectory, getDirectories} from "../../services/directory-api";

const directoryAdapter = createEntityAdapter();

export const getDirectoriesAsync = createAsyncThunk('directories/getDirectories', async() => {
    const response = await getDirectories();
    return (response.data);
});

export const createDirectoryAsync = createAsyncThunk('directories/createDirectory', async(directory) => {
    return createDirectory(directory);
});

const initialState = directoryAdapter.getInitialState({
    data: [],
    isLoading: false,
    error: null,
});

export const directorySlice = createSlice({
    name: 'directories',
    initialState,
    reducers: {
      toggleFolder: (state, action) => {
          console.log(action.payload);
          const item = state.data.find(item => item.id === action.payload);
          if (item) item.isOpen = !item.isOpen;
          //state.data.push({name: 'birdeme', id: 27 });
      }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDirectoriesAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDirectoriesAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                directoryAdapter.setAll(state, getChildren(action.payload))
            })
            .addCase(getDirectoriesAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createDirectoryAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createDirectoryAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(createDirectoryAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {toggleFolder} = directorySlice.actions;

export default directorySlice.reducer;

export const {selectAll: selectAllDirectories, selectById: selectDirectoryById } = directoryAdapter.getSelectors((state) => state.directories);

function getChildren(list) {
    return list.map(listItem => ({...listItem, children: list.filter(innerListItem => innerListItem.parentId && innerListItem.parentId === listItem.id).map(innerListItem => innerListItem.id)}));
}

function normalizeList(list) {
    const idMapping = list.reduce((acc, el, i) => {
        acc[el.id] = i;
        return acc;
    }, {});
    let root;
    list.forEach((el) => {
        el.isOpen = false;
        if (!el.parentId) {
            root = el;
            return;
        }
        const parentEl = list[idMapping[el.parentId]];
        parentEl.children ? parentEl.children.push(el) : parentEl.children = [el];
    });

    return root.children;
}