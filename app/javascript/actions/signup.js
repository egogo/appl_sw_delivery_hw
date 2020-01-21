import { SIGNUP } from './types';

export const createSignup = (event_id, email) => dispatch => {
    fetch('/api/v1/events/'+event_id+'/sign_up', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({email: email})
    })
    .then(function(res) {
        if(res.ok) {
            return res.json()
        }else{ // 422 handling
            return res.text().then(text => { return JSON.parse(text)});
        }
    })
    .then(function(post) {
            dispatch({
                type: SIGNUP,
                payload: post
            })
        }
    );
};