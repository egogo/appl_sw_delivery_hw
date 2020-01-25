import {ADMIN_FETCH_EVENTS, ADMIN_DELETE_EVENT, ADMIN_FETCH_EVENT} from '../actions/types';

const initialState = {
    items: [],
    page: 1,
    per_page: 10,
    total: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADMIN_FETCH_EVENTS:
            return {
                ...state,
                ...{
                    items: action.payload.events,
                    page: action.payload.page,
                    per_page: action.payload.per_page,
                    total: action.payload.total
                }
            };
        case ADMIN_DELETE_EVENT:
            return {
                ...state
            }
        default:
            return state;
    }
}