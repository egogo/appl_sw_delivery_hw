import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {createSignup} from "../actions/signup";

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({email: event.target.value});
    }

    handleSubmit(event) {
        this.props.createSignup(this.props.eventId, this.state.email)
        event.preventDefault();
    }

    render() {
        var notice;
        if(this.props.result && this.props.result.ok == false) {
            notice = <span>There was an error: {this.resultToErrorMsg(this.props.result)}</span>
        }else if(this.props.result && this.props.result.ok == true) {
            notice = <span>Signed up successfully!</span>
        }else{
            notice = ""
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input type="text" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Sign Up" />
                </form>
                {notice}
            </div>

        );
    }

    resultToErrorMsg(result) {
        console.log(result)
        if(result.error == 'already_signed_up') {
            console.log("Email already signed up.")
            return "Email already signed up."
        }else if(result.error == 'invalid_email') {
            console.log("Email address is invalid.")
            return "Email address is invalid."
        }
        return ""
    }
}

SignupForm.propTypes = {
    eventId: PropTypes.number.isRequired,
    createSignup: PropTypes.func.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...ownProps,
        result: state.signup.result
    }
}

export default connect(mapStateToProps, { createSignup })(SignupForm);
