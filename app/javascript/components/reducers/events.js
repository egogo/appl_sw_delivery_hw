import { FETCH_EVENTS } from '../actions/types';

const initialState = {
        items: [],
        page: 1,
        per_page: 10,
        total: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_EVENTS:
            return {
                items: action.payload.events,
                page: action.payload.page,
                per_page: action.payload.per_page,
                total: action.payload.total,
            };
        default:
            return initialState;
    }
}