import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {APIKeyContext} from "./api_key_context"
import { fetchEvent, updateEvent, createEvent } from "./../actions/admin_events";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminLocationSelect from './admin_location_select'

const defaultState = {
    name: '',
    description: '',
    starts: new Date(),
    ends: new Date(),
    location: {id: null, name: ''},
}

class AdminEventEditor extends Component {

    constructor(props) {
        super(props);

        this.state = defaultState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let newState = this.state
        newState[event.target.name] = event.target.value
        this.setState(newState);
    }

    handleStartsChange(value) {
        let newState = this.state
        newState.starts = value
        this.setState(newState);
    }

    handleEndsChange(value) {
        let newState = this.state
        newState['ends'] = value
        this.setState(newState);
    }

    handleLocationChange(val) {
        let newState = this.state
        newState['location'] = {}
        newState['location']['id'] = val.value
        newState['location']['name'] = val.label
        newState['location_id'] = val.value
        this.setState(newState);
    }

    handleSubmit(event) {
        if(this.props.match.params.eventId){
            updateEvent(
                this.context.api_access_token,
                this.props.match.params.eventId,
                this.state,
                ((res) => { if(res != {}) { this.handleErrorMessages(res)}})
            )
        }else{
            createEvent(
                this.context.api_access_token,
                this.state,
                ((res) => { if(res != {}) { this.handleErrorMessages(res) } })
            )
        }
        event.preventDefault();
    }

    handleErrorMessages(errors) {

    }

    componentDidMount() {
        if (this.props.match.params.eventId) {
            this.props.fetchEvent(this.context.api_access_token, this.props.match.params.eventId);
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        if (this.props.match.params.eventId) {
            this.setState(props.event);
        }else{
            this.setState(defaultState);
        }

    }

    render(){
        const event = this.state;
        return (
            <div className="card">
                <div className="card-header">
                    Event Editor:
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" className="form-control" value={event.name} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" name="description" onChange={this.handleChange}
                                      value={event.description} rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label>Starts</label><br/>
                            <DatePicker
                                selected={event.starts}
                                onChange={(val) => this.handleStartsChange(val)}
                                name="starts" className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Ends</label><br/>
                            <DatePicker
                                selected={event.ends}
                                onChange={(val) => this.handleEndsChange(val)}
                                name="starts" className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <AdminLocationSelect name="location"
                                                 selectedOption={{label: event.location.name, value: event.location.id}}
                                                 onSelectChange={(val) => this.handleLocationChange(val)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                        &nbsp;&nbsp;or <Link to={``}>Cancel</Link>
                    </form>
                </div>
            </div>
        );
    }
}

AdminEventEditor.contextType = APIKeyContext;

AdminEventEditor.propTypes = {
    fetchEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
    return {
        event: {
            ...state.adminEvent,
            starts: new Date(state.adminEvent.starts),
            ends: new Date(state.adminEvent.ends),
        }
    }
}

export default connect(mapStateToProps, {fetchEvent})(AdminEventEditor);