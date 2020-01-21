import { combineReducers } from 'redux';
import eventsReducer from './events'
import eventReducer from './event'
import signupReducer from "./signup";

export default combineReducers({
    events: eventsReducer,
    event: eventReducer,
    signup: signupReducer,
});