import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {
    events: {
        items: [],
        page: 1,
        per_page: 10,
        total: 0
    }
};

const middleware = [thunk];

export default function configureStore() {
    const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
    return store;
}