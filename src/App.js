import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import LatLon_NvectorEllipsoidal, {Ned} from "geodesy/latlon-nvector-ellipsoidal";
import './App.css';
import Camera from './Camera';
import Geolocation from './Geolocation';
import TargetMap from './TargetMap';
import Orientation from './Orientation';

const toRadians = angle => angle * (Math.PI / 180);

class App extends Component {
  state = {
    coords: null,
    geolocationMessage: '',
    orientation: null,
    ypr: {yawDeg: 0, pitchDeg: 0, rollDeg: 0},
    ned: new Ned(0, 0, 0),
    nedUpdateCount: 0
  }
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
    let {alpha, beta, gamma} = event;
    let [yawDeg, pitchDeg, rollDeg] = [360-alpha, beta - 90, gamma];
    if (pitchDeg < -180) {
      pitchDeg += 360;
    }
    this.setState({ypr: {yawDeg, pitchDeg, rollDeg}})

    const [yawRad, pitchRad, rollRad] = [yawDeg, pitchDeg, rollDeg].map(toRadians)

    const east = Math.sin(yawRad);
    const north = Math.cos(yawRad);
    const up =  Math.sin(pitchRad);

    const ned = new Ned(north, east, -up);
    this.setState({ned: ned});
    this.calculatePointingLocation();
  };

  calculatePointingLocation = () => {
    if (!this.state.ned || !this.state.coords) {
      return;
    }
    const {latitude, longitude, altitude} = this.state.coords;
    const selfLocation = new LatLon_NvectorEllipsoidal(latitude, longitude, altitude)
    const selfOrientation = this.state.ned;

    const scaleFactor = 100;
    let scaledOrientation = new Ned(selfOrientation.north * scaleFactor, selfOrientation.east * scaleFactor, selfOrientation.down * scaleFactor);
    let targetPoint = selfLocation.destinationPoint(scaledOrientation);
    this.setState({targetPoint,})
  };

  render = () => (
    <>
      <Geolocation
        geolocationMessage={this.state.geolocationMessage}
        coords={this.state.coords}
      />
      <Orientation orientation={this.state.orientation}/>
      <div className={'orientation'}>
        {
          `Yaw: ${Math.round(this.state.ypr.yawDeg)}, 
          Pitch: ${Math.round(this.state.ypr.pitchDeg)}, 
          Roll: ${Math.round(this.state.ypr.rollDeg)}`
        }
      </div>
      <div className={'orientation'}>
        {
          `NED: ${this.state.ned.toString(2)}`
        }
      </div>
      <div className={'orientation'}>
        {
          `Elevation: ${Math.round(this.state.ned.elevation)} Bearing: ${Math.round(this.state.ned.bearing)}
          atan2(E,N)=${Math.round(Math.atan2(this.state.ned.east, this.state.ned.north).toDegrees())}`
        }
      </div>
      <Geolocation
        coords={this.state.targetPoint}
      />
      <TargetMap
        className={'map-container'}
        selfCoords={this.state.coords}
        targetCoords={this.state.targetPoint}
      />
      <Camera/>
    </>
  );
}

export default geolocated({})(App);
