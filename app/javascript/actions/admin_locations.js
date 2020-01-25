import { ADMIN_FETCH_LOCATIONS } from './types';

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
