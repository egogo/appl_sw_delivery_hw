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
    errors: {},
    displaySuccessNotification: false
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
        newState.ends = value
        this.setState(newState);
    }

    handleLocationChange(val) {
        let newState = this.state
        newState.location = {};
        newState.location.id = val.value;
        newState.location.name = val.label;
        newState.location_id = val.value;
        this.setState(newState);
    }

    getCssStringFor(field) {
        const base = "form-control form-control-sm";
        if(field in this.state.errors && this.state.errors[field].length > 0) {
            return base + ' is-invalid';
        }
        return base
    }

    getErrorMessages(field) {
        let error_msgs = ""
        if(field in this.state.errors && this.state.errors[field].length > 0) {
            error_msgs = this.state.errors[field].map((msg) => "'"+field+"' "+msg).join(", ")
        }

        if(error_msgs == "") {
            return ""
        }else{
            return (
                <div className="invalid-feedback">
                    {error_msgs}
                </div>
            )
        }
    }

    handleSubmit(event) {
        if(this.props.match.params.eventId){
            updateEvent(
                this.context.api_access_token,
                this.props.match.params.eventId,
                this.state,
                (json) => {
                    if('errors' in json) {
                        this.handleErrorMessages(json.errors)
                    }else{
                        this.setState({
                            ...this.state,
                            errors: {},
                            displaySuccessNotification: true
                        })
                        this.hideNotificationWithDelay()
                    }
                }
            )
        }else{
            createEvent(
                this.context.api_access_token,
                this.state,
                (json) => {
                    if('ok' in json) {
                        this.handleErrorMessages(json.errors)
                    }else{
                        this.redirectToEventEditor(json)
                    }
                }
            )
        }
        event.preventDefault();
    }

    redirectToEventEditor(json) {
        this.props.history.push('/events/'+json.id+'/edit')
        this.setState({
            ...this.state,
            errors: {},
            ...json,
            starts: new Date(json.starts),
            ends: new Date(json.ends),
            displaySuccessNotification: true
        });
        this.hideNotificationWithDelay()
    }

    hideNotificationWithDelay() {
        setTimeout(()=> {this.setState(
            {
                ...this.state,
                displaySuccessNotification: false
            }
        )}, 2000)
    }

    handleErrorMessages(errors) {
        this.setState({...this.state, errors: errors})
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
                            <input type="text" name="name" className={this.getCssStringFor('name')} value={event.name} onChange={this.handleChange} />
                            {this.getErrorMessages('name')}
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className={this.getCssStringFor('description')} name="description" onChange={this.handleChange}
                                      value={event.description} rows="3"></textarea>
                            {this.getErrorMessages('description')}
                        </div>
                        <div className="form-group">
                            <label>Starts</label><br/>
                            <DatePicker
                                selected={event.starts}
                                onChange={(val) => this.handleStartsChange(val)}
                                name="starts" className={this.getCssStringFor('starts')}
                            />
                            {this.getErrorMessages('starts')}
                        </div>
                        <div className="form-group">
                            <label>Ends</label><br/>
                            <DatePicker
                                selected={event.ends}
                                onChange={(val) => this.handleEndsChange(val)}
                                name="starts" className={this.getCssStringFor('ends')}
                            />
                            {this.getErrorMessages('ends')}
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <AdminLocationSelect name="location"
                                                 selectedOption={{label: event.location.name, value: event.location.id}}
                                                 onSelectChange={(val) => this.handleLocationChange(val)}
                                                 className={this.getCssStringFor('location')}
                            />
                            {this.getErrorMessages('location')}
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                        &nbsp;<span hidden={!this.state.displaySuccessNotification} className="badge badge-pill badge-success">Saved!</span>
                        &nbsp;or <Link to={``}>Go Back</Link>
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