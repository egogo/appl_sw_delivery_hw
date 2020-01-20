import React, { Component } from 'react';
import Pagination from "./pagination";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchEvents} from "./actions/events";
import { formattedDates } from './../helpers'

class EventList extends Component {
    UNSAFE_componentWillMount() {
        this.props.fetchEvents(1);
    }

    render(){
        return (
            <div>
                <h1>Events</h1>
                {this.getEvents()}
                <Pagination
                    page={this.props.page}
                    per_page={this.props.per_page}
                    total={this.props.total}
                    jumpTo={this.props.fetchEvents}
                />
            </div>
        );
    }

    getEvents() {
        return this.props.events.map(event => (
            <div  key={event.id}>
                <div className="card">
                    <div className="card-header">
                        {event.name}
                    </div>
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p>{event.location.name} ({formattedDates(event)})</p>
                            <footer className="blockquote-footer"><Link to={`/e/${event.id}`}>More info</Link></footer>
                        </blockquote>
                    </div>
                </div>
                <br/>
            </div>
        ));
    }
}

EventList.propTypes = {
    fetchEvents: PropTypes.func.isRequired,
    events: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    per_page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

const mapStateToProps = function (state) {
    return {
        events: state.events.items,
        page: state.events.page,
        per_page: state.events.per_page,
        total: state.events.total
    }
}

export default connect(mapStateToProps, { fetchEvents })(EventList);