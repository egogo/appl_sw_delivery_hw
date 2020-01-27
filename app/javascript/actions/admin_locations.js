import { ADMIN_FETCH_LOCATIONS, ADMIN_CREATE_LOCATION } from './types';

export const fetchLocations = (token) => dispatch => {
    fetch('/api/v1/admin/locations', {
        headers: { 'X-Authorization': 'Bearer '+token }
    })
        .then(res => res.json())
        .then(res =>
            dispatch({
                type: ADMIN_FETCH_LOCATIONS,
                payload: res
            })
        );
};

export const createLocation = (token, location, callback) => {
    fetch('/api/v1/admin/locations', {
        method: "POST",
        headers: { 'X-Authorization': 'Bearer '+token, 'Content-type': 'application/json' },
        body: JSON.stringify({location: location})
    }).then(res => callback(res));
};
