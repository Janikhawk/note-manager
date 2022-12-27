import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {createDirectory, getDirectories, updateDirectory} from "../services/directory-api";

const directoryAdapter = createEntityAdapter();

export const getDirectoriesAsync = createAsyncThunk('directories/getDirectories', async() => {
    const response = await getDirectories();
    return (response.data);
});

export const createDirectoryAsync = createAsyncThunk('directories/createDirectory', async(directory) => {
    const response = await createDirectory(directory);
    return response.data;
});

export const updateDirectoryAsync = createAsyncThunk('directories/updateDirectory', async(directory) => {
    const response = await updateDirectory(directory);
    return response.data;
})

const initialState = directoryAdapter.getInitialState({
    isLoading: false,
    error: null,
    selectedFolder: null
});

export const directorySlice = createSlice({
    name: 'directories',
    initialState,
    reducers: {
        toggleFolder: (state, action) => {
            state.selectedFolder = state.selectedFolder != action.payload ? action.payload : null;
            state.entities[action.payload].isOpen = !state.entities[action.payload].isOpen;
          },
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
            .addCase(createDirectoryAsync.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                const insertData = {...payload, isOpen: false, children: []};
                directoryAdapter.updateOne(state, {
                    id: insertData.parentId,
                    changes: {...state.entities[insertData.parentId], children: [...state.entities[insertData.parentId].children, payload.id]}
                })
                directoryAdapter.addOne(state, insertData)
            })
            .addCase(createDirectoryAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {toggleFolder} = directorySlice.actions;

export default directorySlice.reducer;

export const {selectAll: selectAllDirectories, selectById: selectDirectoryById, selectEntities: entities } = directoryAdapter.getSelectors((state) => state.directories);

function getChildren(list) {
    return list.map(listItem =>
        ({
            ...listItem,
            isOpen: false,
            children: list.filter(innerListItem => innerListItem.parentId && innerListItem.parentId == listItem.id).map(innerListItem => innerListItem.id)
        }));
}

export function selectRootLevel(list) {
    return list.filter(item => item.parentId == 1).map(item => item.id);
}
