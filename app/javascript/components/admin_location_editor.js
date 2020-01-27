import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import {createLocation} from './../actions/admin_locations'
import {APIKeyContext} from "./api_key_context";

const defaultLocationState = {
    name: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
}

class AdminLocatinEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            location: defaultLocationState
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        let newState = this.state
        newState.location[evt.target.name] = evt.target.value;
        this.setState(newState);
    }

    handleSubmit(evt) {
        createLocation(
            this.context.api_access_token,
            this.state.location,
            (resp) => {
                if(resp.status == 200) {
                    resp.json().then((json) => {
                        this.props.optionCreated(json)
                        this.handleCancel()
                    })
                }else{

                }
            }
        )
        evt.preventDefault()
    }

    handleCancel(evt) {
        this.setState({
            ...this.state,
            location: defaultLocationState
        })
        this.toggleForm()
    }

    toggleForm() {
        this.setState({...this.state, showForm: !this.state.showForm})
        this.props.editorIsVisible(!this.state.showForm)
    }

    render() {
        const loc = this.state.location;
        return (
            <div>
                <button hidden={this.state.showForm} type="button" className="btn btn-link" onClick={()=>this.toggleForm()}>Add new location</button>
                <div hidden={!this.state.showForm} className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            New location:
                        </div>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-sm-4">
                                    <label>Name</label>
                                    <input type="text" name="name" className="form-control form-control-sm" value={loc.name} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-sm-8">
                                    <label>Address</label>
                                    <input type="text" name="address" className="form-control form-control-sm" value={loc.address} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-6">
                                    <label>City</label>
                                    <input type="text" name="city" className="form-control form-control-sm" value={loc.city} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-sm-3">
                                    <label>State</label>
                                    <input type="text" name="state" className="form-control form-control-sm" value={loc.state} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-sm-3">
                                    <label>Postal Code</label>
                                    <input type="text" name="postal_code" className="form-control form-control-sm" value={loc.postal_code} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-4">
                                    <label>Country</label>
                                    <input type="text" name="country" className="form-control form-control-sm" value={loc.country} onChange={this.handleChange} />
                                </div>
                                <div className="col-sm-8 ">
                                    <br/>
                                    <button type="submit" className="btn btn-primary btn-sm" onClick={this.handleSubmit}>Create</button>
                                    &nbsp;&nbsp;or <button type="button" className="btn btn-link" onClick={()=>this.handleCancel()}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

AdminLocatinEditor.propTypes = {
    optionCreated: PropTypes.func.isRequired,
    editorIsVisible: PropTypes.func.isRequired
}

AdminLocatinEditor.contextType = APIKeyContext;

export default AdminLocatinEditor;