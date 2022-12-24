import { configureStore } from '@reduxjs/toolkit'
import folderReducer from './reducers/folder-reducer';

const store = configureStore({reducer: folderReducer});
export default store;