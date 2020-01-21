import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchEvent} from "./../actions/events";
import { formattedDates } from './../helpers'
import SignupForm from "./signup_form";

class EventDetails extends Component {
    componentDidMount() {
        this.props.fetchEvent(this.props.match.params.eventId);
    }

    render(){
        const event = this.props.event;
        return (
            <div className="card">
                <div className="card-header">
                    {event.name}
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>{event.description}</p>
                        <p>
                            {formattedDates(event)}
                        </p>
                        <p>
                            {event.location.name} ({event.location.address})
                        </p>
                        <footer className="blockquote-footer">
                            <Link to={``}>Back</Link>
                        </footer>
                    </blockquote>
                </div>
                <div className="card-footer">
                    <SignupForm eventId={parseInt(event.id)} />
                </div>
            </div>
        );
    }
}

EventDetails.propTypes = {
    fetchEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
    return {
        event: state.event
    }
}

export default connect(mapStateToProps, { fetchEvent })(EventDetails);