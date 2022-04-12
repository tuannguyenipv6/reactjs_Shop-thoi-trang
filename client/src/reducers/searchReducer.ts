// Cần xóa


import { SearchActionType } from "./types";

const {DEMO} = SearchActionType;

interface ISearchState {
    searchState: string;
}

interface ISearchAction {
    type: SearchActionType;
    payload: ISearchState;
}

export const searchReducer = (state: ISearchState, action: ISearchAction) => {
    const {type, payload} = action;
    console.log({state, payload});
    switch (type) {
        case DEMO: return {
            ...state,
            searchState: 'Tuấn Nguyễn'
        }
        default:
            throw new Error('Invalid action!');
    }
}