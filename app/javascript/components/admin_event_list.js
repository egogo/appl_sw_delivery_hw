import React, { Component } from 'react';
import Pagination from "./pagination";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { fetchEvents, deleteEvent } from "./../actions/admin_events";
import { formattedDates } from './../helpers'
import {APIKeyContext} from "./api_key_context"

class AdminEventList extends Component {

    UNSAFE_componentWillMount() {
        this.props.fetchEvents(this.context.api_access_token, 1);
    }

    render(){
        return (
            <div>
                <h1>Events</h1>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Dates</th>
                        <th scope="col" colSpan="3"></th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.getEvents()}
                    </tbody>
                </table>
                <Pagination
                    page={this.props.page}
                    per_page={this.props.per_page}
                    total={this.props.total}
                    jumpTo={(page) => this.props.fetchEvents(this.context.api_access_token, page) }
                /> or <Link to={`/events/new`}>Create new</Link>
            </div>
        );
    }

    getEvents() {
        return this.props.events.map(event => (
            <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.location.name}</td>
                <td>{formattedDates(event)}</td>
                <td><Link to={`/events/${event.id}/signups`}>Signups</Link></td>
                <td><Link to={`/events/${event.id}/edit`}>Edit</Link></td>
                <td><a href="#" onClick={() => this.deleteEvent(event.id)}>Delete</a></td>
            </tr>
        ));
    }

    deleteEvent(event_id) {
        deleteEvent(this.context.api_access_token, event_id, () => {
            this.props.fetchEvents(this.context.api_access_token, this.props.page)
        })

    }
}

AdminEventList.contextType = APIKeyContext;

AdminEventList.propTypes = {
    fetchEvents: PropTypes.func.isRequired,
    events: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    per_page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

const mapStateToProps = function (state) {
    return {
        events: state.adminEvents.items,
        page: state.adminEvents.page,
        per_page: state.adminEvents.per_page,
        total: state.adminEvents.total
    }
}

export default connect(mapStateToProps, { fetchEvents })(AdminEventList);