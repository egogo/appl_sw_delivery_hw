import { FETCH_EVENTS, FETCH_EVENT } from './types';

export const fetchEvents = (page=1) => dispatch => {
    fetch('/api/v1/events?page='+page)
        .then(res => res.json())
        .then(res =>
            dispatch({
                type: FETCH_EVENTS,
                payload: res
            })
        );
};

export const fetchEvent = (id) => dispatch => {
    fetch('/api/v1/events/'+id)
        .then(res => res.json())
        .then(res =>
            dispatch({
                type: FETCH_EVENT,
                payload: res
            })
        );
};
