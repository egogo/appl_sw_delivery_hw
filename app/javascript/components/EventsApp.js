import React from "react"
import { Provider } from "react-redux"
import configureStore from "./store";
import Events from './events'
const store = configureStore();

class EventsApp extends React.Component {
    render () {
        return (
          <Provider store={store}>
              <Events />
          </Provider>
        );
    }
}

export default EventsApp
