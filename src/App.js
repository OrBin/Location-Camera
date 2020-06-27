import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import './App.css';
import Camera from './Camera';
import Geolocation from './Geolocation';


class App extends Component {
  state = {}
  componentDidMount() {
    this.processLocation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.processLocation();
    }
  }

  processLocation = () => {
    if (!this.props.isGeolocationAvailable) {
      this.setState({coords: null, geolocationMessage: "Your browser does not support Geolocation"});
    } else if (!this.props.isGeolocationEnabled) {
      this.setState({coords: null, geolocationMessage: "Geolocation is not enabled"});
    } else if (!this.props.coords) {
      this.setState({coords: null, geolocationMessage: "Getting location data..."});
    } else {
      this.setState({coords: this.props.coords, geolocationMessage: null});
    }
  };

  render = () => (
    <>
      <Geolocation
        geolocationMessage={this.state.geolocationMessage}
        coords={this.state.coords}
      />
      <Camera />
    </>
  );
}

export default geolocated({})(App);
