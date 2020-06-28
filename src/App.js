import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import './App.css';
import Camera from './Camera';
import Geolocation from './Geolocation';
import Orientation from './Orientation';


class App extends Component {
  state = { coords: null, geolocationMessage: '', orientation: null}
  componentDidMount() {
    this.processLocation();
    window.addEventListener('deviceorientationabsolute', this.handleOrientation, true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.processLocation();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('deviceorientationabsolute', this.handleOrientation, true);
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

  handleOrientation = event => {
    this.setState({orientation: event})
  };

  render = () => (
    <>
      <Geolocation
        geolocationMessage={this.state.geolocationMessage}
        coords={this.state.coords}
      />
      <Orientation orientation={this.state.orientation}/>
      <Camera />
    </>
  );
}

export default geolocated({})(App);
