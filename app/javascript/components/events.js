import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import EventList from "./event_list";
import EventDetails from './event_details'

export default class Events extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path={`/e/:eventId`} component={EventDetails} />
                    <Route path={``}>
                        <EventList />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
