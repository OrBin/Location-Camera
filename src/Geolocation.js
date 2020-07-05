import React from 'react';
import { round } from './round';

const coordinatesDigitsAfterPoint = 4;
const roundCoordinate = coordinate => (Math.round(coordinate*(10**coordinatesDigitsAfterPoint)) / (10**coordinatesDigitsAfterPoint));
const Geolocation = ({geolocationMessage, coords}) => {
  let innerDiv;
  if (!coords) {
    innerDiv = (<div>{geolocationMessage}</div>);
  } else {
    let {latitude, longitude} = coords;
    [latitude, longitude] = [latitude, longitude].map(roundCoordinate);

    innerDiv = (
      <div>
        {`${latitude}, ${longitude})`}
        {coords.altitude ? `, ${round(coords.altitude)}m` : `, ${round(coords.height)}m`}
        {coords.heading ? `, hdg: ${round(coords.heading)}` : null}
      </div>
    )
  }

  return (
    <div className={'geolocation'}>
      {innerDiv}
    </div>
  );
}

export default Geolocation;
