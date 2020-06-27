import React, { Component } from 'react';
import Webcam from 'react-webcam';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      videoSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    });
  }

  render = () => (
    <Webcam
      className={'camera'}
      audio={false}
      videoConstraints={
        {
          facingMode: "environment",
          ...this.state.videoSize,
        }
      }
    />
  );
}

export default Camera;
