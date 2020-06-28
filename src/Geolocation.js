import React from 'react';
import { round } from './round';

const Geolocation = ({geolocationMessage, coords}) => (
  <div className={'geolocation'}>
    {
      coords ? (
        <div>({`${coords.latitude}, ${coords.longitude})`}{coords.altitude ? `, ${round(coords.altitude)}m` : null}{coords.heading ? `, hdg: ${round(coords.heading)}` : null}</div>
      ) : (
            <div>{geolocationMessage}</div>
          )
      }
  </div>
);

export default Geolocation;
