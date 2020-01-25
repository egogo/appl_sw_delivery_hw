import {ADMIN_FETCH_LOCATIONS} from '../actions/types';

const initialState = {
    items: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADMIN_FETCH_LOCATIONS:
            return {
                ...state,
                ...{
                    items: action.payload.items,
                }
            };
        default:
            return state;
    }
}