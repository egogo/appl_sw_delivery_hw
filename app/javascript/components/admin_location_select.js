import React, { Component } from 'react';
import {connect} from "react-redux";
import {APIKeyContext} from "./api_key_context"
import { fetchLocations } from "./../actions/admin_locations";
import AdminLocatinEditor from "./admin_location_editor";
import Select from 'react-select';

class AdminLocationSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: props.selectedOption,
            isInEditorMode: false,
        }
    }
    componentDidMount() {
        this.props.fetchLocations(this.context.api_access_token)
    }

    handleChange = selectedOption => {
        this.setState(
            {
                ...this.state,
                selectedOption: selectedOption,
            }
        )
        this.props.onSelectChange(selectedOption)
    };

    optionCreated(newOption) {
        this.setState({
            ...this.state,
            selectedOption: {
                value: newOption.id,
                label: newOption.name
            }
        })
        this.toggleSelectVisibility()
        this.props.fetchLocations(this.context.api_access_token)
    }

    editorIsVisible(val) {
        this.setState({
            ...this.state,
            isInEditorMode: val
        })
    }

    render(){
        let selectedOption  = this.state.selectedOption;
        if(!selectedOption.value) {
            selectedOption = this.props.selectedOption
        }

        let options = []
        if(this.props.adminLocations) {
            options = this.props.adminLocations.items.map((loc) => {
                return { value: loc.id, label: loc.name}
            })
        }
        return (
            <span>
                <div hidden={this.state.isInEditorMode}>
                    <Select value={selectedOption}
                            onChange={this.handleChange}
                            options={options}
                    />
                </div>
                <AdminLocatinEditor editorIsVisible={(val)=>this.editorIsVisible(val)} optionCreated={(jsn) => this.optionCreated(jsn)} />
            </span>
        );
    }
}

AdminLocationSelect.contextType = APIKeyContext;

const mapStateToProps = function (state) {
    return {
        ...state
    }
}

export default connect(mapStateToProps, {fetchLocations})(AdminLocationSelect);