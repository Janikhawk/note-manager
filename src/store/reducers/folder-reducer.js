import { act } from 'react-dom/test-utils';
import * as ACTION_TYPES from '../action-types';

const initialState = {
    numOfFolders: 0,
    folders: []
};

export default function folderReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.ADD_ITEM: 
            return {
                ...state,
                numOfFolders: state.numOfFolders + 1
            };
        default:
            return state;
    }
};
