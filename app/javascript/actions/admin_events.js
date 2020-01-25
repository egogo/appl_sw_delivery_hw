import { ADMIN_FETCH_EVENTS, ADMIN_FETCH_EVENT,ADMIN_CREATE_EVENT, ADMIN_UPDATE_EVENT,ADMIN_FETCH_EVENT_SIGNUPS } from './types';

export const fetchEvents = (token, page=1) => dispatch => {
    fetch('/api/v1/admin/events?page='+page, {
        headers: { 'X-Authorization': 'Bearer '+token }
    })
        .then(res => res.json())
        .then(res =>
            dispatch({
                type: ADMIN_FETCH_EVENTS,
                payload: res
            })
        );
};

export const fetchEvent = (token, id) => dispatch => {
    fetch('/api/v1/admin/events/'+id, {
        headers: { 'X-Authorization': 'Bearer '+token }
    })
        .then(res => res.json())
        .then(res =>
            dispatch({
                type: ADMIN_FETCH_EVENT,
                payload: res
            })
        );
};

export const updateEvent = (token, id, event, callback) => {
    fetch('/api/v1/admin/events/'+id, {
        method: 'PUT',
        headers: {
            'X-Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({event: event})
    })
    .then(
        (res) => {
            if(res.status != 204) {
                callback(res.json())
            }else{
                callback({})
            }
        }
    )
};

export const createEvent = (token, event, callback) => {
    fetch('/api/v1/admin/events', {
        method: 'POST',
        headers: {
            'X-Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({event: event})
    }).then(
            (res) => {
                if(res.status != 204) {
                    callback(res.json())
                }else{
                    callback({})
                }
            }
        )
};

export const deleteEvent = (token, id, callback) =>
    fetch('/api/v1/admin/events/'+id, {
        method: 'DELETE',
        headers: { 'X-Authorization': 'Bearer '+token }
    })
    .then(() => callback());

export const fetchEventSignups = (token, id) => dispatch => {
    fetch('/api/v1/admin/events/'+id+'/signups?per_page=200', {
        headers: { 'X-Authorization': 'Bearer '+token }
    })
    .then(res => res.json())
    .then(res =>
        dispatch({
            type: ADMIN_FETCH_EVENT_SIGNUPS,
            payload: res
        })
    );
};

export const createEventSignup = (token, event_id, email, callback) => dispatch => {
    fetch('/api/v1/admin/events/'+event_id+'/signups', {
        method: 'POST',
        headers: {
            'X-Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({signup: {email: email}})
    })
    .then(res => res.json())
    .then(res => callback(res))
};

export const deleteEventSignup = (token, event_id, signup_id, callback) => dispatch => {
    fetch('/api/v1/admin/events/'+event_id+'/signups/'+signup_id, {
        method: 'DELETE',
        headers: {
            'X-Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    })
        // .then(res => res.json())
        .then(res => callback(res))
};
