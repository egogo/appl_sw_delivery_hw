import { FETCH_EVENT } from '../actions/types';

const initialState = {
    id: '',
    name: '',
    description: '',
    location: {},
    starts: '',
    ends: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_EVENT:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}