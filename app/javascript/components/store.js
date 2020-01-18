import {createStore} from "redux";

const initialState = {
    events: []
};

function rootReducer(state, action) {
    console.log(action);
    switch (action.type) {
        default:
            return state
    }
}

export default function configureStore() {
    const store = createStore(rootReducer, initialState);
    return store;
}