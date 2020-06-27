import React from 'react';

const Geolocation = ({geolocationMessage, coords}) => (
  <div className={'geolocation'}>
    {
      coords ? (
        <div>({coords.latitude}, {coords.longitude}), {coords.altitude}m</div>
      ) : (
            <div>{geolocationMessage}</div>
          )
      }
  </div>
);

export default Geolocation;
