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

export const updateNoticeAsync = createAsyncThunk(`${noticesStateName}/updateNotice`, async(noticeData) => {
    const response = await updateNotice(noticeData);
    return response.data;
});

export const updateNoticesPositions = createAsyncThunk(`${noticesStateName}/updateNoticesPosition`, async(noticeList) => {
    const resultArray = [];
    await Promise.all(noticeList.map(async(notice, index) => {
        if (notice.position !== index) {
            const response = await updateNotice({...notice, position: index});
            resultArray.push(response.data);
        }
    }));
    return resultArray;
});

export const deleteNoticeAsync = createAsyncThunk(`${noticesStateName}/deleteNotice`, async(directoryId) => {
    await deleteNotice(directoryId);
    return directoryId;
});

const initialState = noticesAdapter.getInitialState({
    filterName: null,
});

export const noticeSlice = createSlice({
    name: noticesStateName,
    initialState,
    reducers: {
        setFilter: (state, {payload: filterName}) => {
            state.filterName = filterName;
            const noticeList = Object.values(state.entities);
            state.data = filterName ? noticeList.filter(item => item.title.includes(filterName)) : noticeList;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNoticesAsync.fulfilled, (state, {payload: noticeList}) => {
                noticesAdapter.setAll(state, noticeList);
            })
            .addCase(createNoticeAsync.fulfilled, (state, {payload: notice}) => {
                noticesAdapter.addOne(state, notice)
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
            .addCase(updateNoticesPositions.fulfilled, (state, {payload: noticeList}) => {
                noticeList.length && noticeList.forEach(notice => {
                    noticesAdapter.updateOne(state, {
                        id: notice.id,
                        changes: notice
                    })
                });
            })
    }
});

export const {setFilter} = noticeSlice.actions;

export const { selectAll: selectAllNotices, selectById: selectNoticeById } = noticesAdapter.getSelectors(state => state[noticesStateName]);

const selectSelf = (state) => state
export const selectByDirectoryId = (directoryId) => createSelector(selectSelf, (state) => {
    return Object.values(state.notices.entities).filter(item => item.directoryId == directoryId).sort((a,b) => a.position - b.position);
});

export const selectAllNoticesTags = () => createSelector(selectSelf, (state) => {
    return Object.values(state.notices.entities).reduce((acc, curr) => {
        curr.tags && acc.push(...curr.tags);
        return acc;
    }, [])
})
