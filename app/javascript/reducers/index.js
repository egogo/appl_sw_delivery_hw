import { combineReducers } from 'redux';
import eventsReducer from './events'
import eventReducer from './event'
import signupReducer from "./signup";
import adminEventsReducer from './admin_events'
import adminEventReducer from './admin_event'
import adminEventSignupsReducer from './admin_event_signups'
import adminLocationsReducer from './admin_locations'

export default combineReducers({
    events: eventsReducer,
    event: eventReducer,
    signup: signupReducer,
    adminEventSignups: adminEventSignupsReducer,
    adminEvents: adminEventsReducer,
    adminEvent: adminEventReducer,
    adminLocations: adminLocationsReducer,
});