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
            location: defaultLocationState,
            errors: {}
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
                }else if(resp.status == 422){
                    resp.json().then((json) => {
                        this.highlightErrors(json.errors)
                    })
                }
            }
        )
        evt.preventDefault()
    }

    resetErrors() {
        this.setState({...this.state, errors: {}})
    }

    highlightErrors(errors) {
        this.setState({...this.state, errors: errors})
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
                                    <input type="text" name="name" className={this.getCssStringFor('name')} value={loc.name} onChange={this.handleChange} />
                                    {this.getErrorMessages('name')}
                                </div>
                                <div className="form-group col-sm-8">
                                    <label>Address</label>
                                    <input type="text" name="address" className={this.getCssStringFor('address')} value={loc.address} onChange={this.handleChange} />
                                    {this.getErrorMessages('address')}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-6">
                                    <label>City</label>
                                    <input type="text" name="city" className={this.getCssStringFor('city')} value={loc.city} onChange={this.handleChange} />
                                    {this.getErrorMessages('city')}
                                </div>
                                <div className="form-group col-sm-3">
                                    <label>State</label>
                                    <input type="text" name="state" className={this.getCssStringFor('state')} value={loc.state} onChange={this.handleChange} />
                                    {this.getErrorMessages('state')}
                                </div>
                                <div className="form-group col-sm-3">
                                    <label>Postal Code</label>
                                    <input type="text" name="postal_code" className={this.getCssStringFor('postal_code')} value={loc.postal_code} onChange={this.handleChange} />
                                    {this.getErrorMessages('postal_code')}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-4">
                                    <label>Country</label>
                                    <input type="text" name="country" className={this.getCssStringFor('country')} value={loc.country} onChange={this.handleChange} />
                                    {this.getErrorMessages('country')}
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