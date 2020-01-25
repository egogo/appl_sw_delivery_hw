import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {APIKeyContext} from "./api_key_context"
import { fetchEventSignups, createEventSignup, deleteEventSignup } from "./../actions/admin_events";
import "react-datepicker/dist/react-datepicker.css";

class AdminEventSignupsEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {email_to_signup: ''}
    }

    handleChange(event) {
        let newState = this.state
        newState.email_to_signup = event.target.value
        this.setState(newState);
    }
    deleteSignup(id) {
        console.log(id)
        deleteEventSignup(this.context.api_access_token, this.props.match.params.eventId, id, ((json) => {
            this.props.fetchEventSignups(this.context.api_access_token, this.props.match.params.eventId)
        }))()
    }

    signupEmail(event) {
        createEventSignup(
            this.context.api_access_token,
            this.props.match.params.eventId,
            this.state.email_to_signup,
            ((json) => {
                console.log(json)
                this.setState({email_to_signup: ''})
                this.props.fetchEventSignups(this.context.api_access_token, this.props.match.params.eventId)
            }),
        )()
        event.preventDefault()
    }

    componentDidMount() {
        if (this.props.match.params.eventId) {
            this.props.fetchEventSignups(this.context.api_access_token, this.props.match.params.eventId);
        }
    }

    render(){
        return (
            <div className="card">
                <div className="card-header">
                    Event Signups:
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Email</th>
                            <th scope="col">Creation Date</th>
                            <th scope="col" colSpan="2"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.getSignups()}
                        </tbody>
                    </table>
                    <form className="form-inline">
                        <div className="form-group mb-2">
                            <input type="text" className="form-control"  value={this.state.email_to_signup} onChange={(e)=>this.handleChange(e)} />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2" onClick={(e)=>this.signupEmail(e)}>Add Email</button>
                    </form>
                    or <Link to={``}>Go Back</Link>
                </div>
            </div>
        );
    }

    getSignups() {
        return this.props.signups.signups.map((signup) => {
            return (<tr key={signup.id}>
                <td>{signup.id}</td>
                <td>{signup.email}</td>
                <td>{signup.creation_date}</td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={(e) => this.deleteSignup(signup.id)}>Delete</button>
                </td>
            </tr>)
        })
    }
}

AdminEventSignupsEditor.contextType = APIKeyContext;

AdminEventSignupsEditor.propTypes = {
    fetchEventSignups: PropTypes.func.isRequired,
    signups: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
    return {
        signups: state.adminEventSignups
    }
}

export default connect(mapStateToProps, {fetchEventSignups})(AdminEventSignupsEditor);