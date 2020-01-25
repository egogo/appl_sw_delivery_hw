import {ADMIN_FETCH_EVENT_SIGNUPS} from '../actions/types';

const initialState = {
    signups: [],
    page: 1,
    per_page: 10,
    total: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADMIN_FETCH_EVENT_SIGNUPS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}