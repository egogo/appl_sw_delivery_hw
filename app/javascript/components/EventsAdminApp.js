import React, { Component } from 'react';
import { Provider } from "react-redux"
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import configureStore from "./admin_store";
const store = configureStore();
import AdminEventList from "./admin_event_list"
import AdminEventEditor from './admin_event_editor'
import AdminEventSignupsEditor from './admin_event_signups_editor'
import {APIKeyContext} from "./api_key_context"

class EventsAdminApp extends Component {
    render () {
        return (
            <APIKeyContext.Provider value={{api_access_token: this.props.api_access_token}}>
                <Provider store={store}>
                    <Router>
                        <Switch>
                            <Route path={`/events/:eventId/signups`} component={AdminEventSignupsEditor} />
                            <Route path={`/events/:eventId/edit`} component={AdminEventEditor} />
                            <Route path={`/events/new`} component={AdminEventEditor} />
                            <Route path={``}>
                                <AdminEventList/>
                            </Route>
                        </Switch>
                    </Router>
                </Provider>
            </APIKeyContext.Provider>
        );
    }
}

export default EventsAdminApp
