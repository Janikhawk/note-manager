import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {createNotice, deleteNotice, getNotices, updateNotice} from "../services/notice-api";

export const noticesStateName = 'notices';

const noticesAdapter = createEntityAdapter();

export const getNoticesAsync = createAsyncThunk(`${noticesStateName}/getNotices`, async() => {
    const response = await getNotices();
    return response.data;
});

export const createNoticeAsync = createAsyncThunk(`${noticesStateName}/createNotice`, async(noticeData) => {
    const response = await createNotice(noticeData);
    return response.data;
});

export const updateNoticeAsync = createAsyncThunk(`${noticesStateName}/updateNotice`, async(directory) => {
    const response = await updateNotice(directory);
    return response.data;
});

export const deleteNoticeAsync = createAsyncThunk(`${noticesStateName}/deleteNotice`, async(directoryId) => {
    await deleteNotice(directoryId);
    return directoryId;
});

const initialState = noticesAdapter.getInitialState({
    filterName: null,
    data: []
});

export const noticeSlice = createSlice({
    name: noticesStateName,
    initialState,
    reducers: {
        setFilter: (state, {payload: filterName}) => {
            state.filterName = filterName;
            const noticeList = Object.values(state.entities);
            state.data = filterName ? noticeList.filter(item => item.title.includes(filterName)) : noticeList;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNoticesAsync.fulfilled, (state, {payload: noticeList}) => {
                noticesAdapter.setAll(state, noticeList);
                state.data = noticeList;
            })
            .addCase(createNoticeAsync.fulfilled, (state, {payload: notice}) => {
                noticesAdapter.addOne(state, notice)
                state.data = [...state.data, notice];
            })
            .addCase(updateNoticeAsync.fulfilled, (state, {payload: notice}) => {
                noticesAdapter.updateOne(state, {
                    id: notice.id,
                    changes: notice
                })
            })
            .addCase(deleteNoticeAsync.fulfilled, (state, {payload: noticeId}) => {
                noticesAdapter.removeOne(state, noticeId)
            })
    }
});

export const {setFilter} = noticeSlice.actions;

export const { selectAll: selectAllNotices, selectById: selectNoticeById } = noticesAdapter.getSelectors(state => state[noticesStateName]);

const selectSelf = (state) => state
export const selectByDirectoryId = (directoryId) => createSelector(selectSelf, (state) => {
    return state.notices.data.filter(item => item.directoryId == directoryId)
});
