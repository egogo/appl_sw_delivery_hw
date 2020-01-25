import {ADMIN_FETCH_EVENT, ADMIN_UPDATE_EVENT, ADMIN_FETCH_EVENT_SIGNUPS} from '../actions/types';

const initialState = {
    name: '',
    description: '',
    starts: new Date(),
    ends: new Date(),
    location: {name: ''}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADMIN_FETCH_EVENT:
            return {
                ...state,
                ...action.payload
            }
        case ADMIN_FETCH_EVENT_SIGNUPS:
            return {
                ...state,
                signups: action.payload
            }
        case ADMIN_UPDATE_EVENT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}