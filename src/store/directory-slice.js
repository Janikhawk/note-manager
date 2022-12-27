import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {createDirectory, deleteDirectory, getDirectories, updateDirectory} from "../services/directory-api";

export const directoryStateName = 'directories';

const directoryAdapter = createEntityAdapter();

export const getDirectoriesAsync = createAsyncThunk(`${directoryStateName}/getDirectories`, async() => {
    const response = await getDirectories();
    return (response.data);
});

export const createDirectoryAsync = createAsyncThunk(`${directoryStateName}/createDirectory`, async(directory) => {
    const response = await createDirectory(directory);
    return response.data;
});

export const updateDirectoryAsync = createAsyncThunk(`${directoryStateName}/updateDirectory`, async(directory) => {
    const response = await updateDirectory(directory);
    return response.data;
});

export const deleteDirectoryAsync = createAsyncThunk(`${directoryStateName}/deleteDirectory`, async(directoryId) => {
    await deleteDirectory(directoryId);
    return directoryId;
});

const initialState = directoryAdapter.getInitialState({
    isLoading: false,
    error: null,
    selectedDirectory: null,
    filteredIdList: [],
});

export const directorySlice = createSlice({
    name: 'directories',
    initialState,
    reducers: {
        toggleDirectory: (state, action) => {
            state.selectedDirectory = state.selectedDirectory != action.payload ? action.payload : null;
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
            .addCase(updateDirectoryAsync.fulfilled, (state, {payload: directory}) => {
                directoryAdapter.updateOne(state, {
                    id: directory.id,
                    changes: directory
                })
            })
            .addCase(deleteDirectoryAsync.fulfilled, (state, {payload: directoryId}) => {
                directoryAdapter.removeOne(state, directoryId)
            })
    }
});

function addParentId(directoryIdList, entities) {
    const filteredIdList = [];
    const parentIdList = [];
    directoryIdList.forEach(directoryId => {
        if (!filteredIdList.includes(directoryId)) {
            filteredIdList.push(parseInt(directoryId));
        }
        if (entities[directoryId].parentId && !parentIdList.includes(entities[directoryId].parentId)) {
            parentIdList.push(parseInt(entities[directoryId].parentId));
        }
    });
    return parentIdList.length ? [...filteredIdList, ...addParentId(parentIdList, entities)] : filteredIdList;
};

export const {toggleDirectory, filterDirectories} = directorySlice.actions;


export const {selectById: selectDirectoryById, selectEntities: entities } = directoryAdapter.getSelectors((state) => state.directories);

function getChildren(list) {
    return list.map(listItem =>
        ({
            ...listItem,
            isOpen: false,
            children: list.filter(innerListItem => innerListItem.parentId && innerListItem.parentId == listItem.id).map(innerListItem => innerListItem.id)
        }));
}

const selectSelf = (state) => state
export const selectRootLevel = () => createSelector(selectSelf, (state) => {
    return Object.values(state.directories.entities).filter(item => item.parentId == 1).map(item => item.id);
});

export const selectAvailableIds = () => createSelector(selectSelf, (state) => {
    const directoryWithNoticesIdList = !!state.notices.filterName ? [...new Set(state.notices.data.map(item => item.directoryId))] : [];
    return addParentId(directoryWithNoticesIdList, state.directories.entities);
})
