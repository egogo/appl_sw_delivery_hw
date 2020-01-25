import React, { Component } from 'react';
import {connect} from "react-redux";
import {APIKeyContext} from "./api_key_context"
import { fetchLocations } from "./../actions/admin_locations";
import Creatable, { makeCreatableSelect } from 'react-select/creatable';

class AdminLocationSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: props.selectedOption,
            isLoading: false,
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

    handleCreate = (inputValue) => {}
    //     this.setState( { ...this.state, isLoading: true });
    //     setTimeout(() => {
    //         this.setState({
    //                     ...this.state,
    //                     isLoading: false
    //         })
    //         this.handleChange(inputValue);
    //     }, 1000)
        // setTimeout(() => {
        //     const { options } = this.state;
        //     const newOption = createOption(inputValue);
        //     console.log(newOption);
        //     console.groupEnd();
        //     this.setState({
        //         isLoading: false,
        //         options: [...options, newOption],
        //         value: newOption,
        //     });
        // }, 1000);
    // };

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
                <Creatable value={selectedOption}
                           onCreateOption={this.handleCreate}
                           onChange={this.handleChange}
                           options={options}
                           isLoading={this.state.isLoading}
                />
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