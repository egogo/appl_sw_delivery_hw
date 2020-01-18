import React from "react"
import PropTypes from "prop-types"
import { Provider } from "react-redux"
import configureStore from "./store";
const store = configureStore();

class EventsApp extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <React.Fragment>
          Events: {this.props.events}
        </React.Fragment>
      </Provider>
    );
  }
}

EventsApp.propTypes = {
  events: PropTypes.node
};

export default EventsApp
