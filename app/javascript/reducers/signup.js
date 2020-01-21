import { SIGNUP } from '../actions/types';

const initialState = {
    result: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
                result: action.payload
            };
        default:
            return state;
    }
}