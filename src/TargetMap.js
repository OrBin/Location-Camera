import React from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import defaultIcon from './DefaultIcon';


const TargetMap = ({selfCoords, targetCoords}) => {
  return (
    <>
      <div>
        {
        (selfCoords && targetCoords)
        ?
        <Map className={'map'} center={[selfCoords.latitude, selfCoords.longitude]} zoom={14}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[targetCoords.latitude, targetCoords.longitude]} icon={defaultIcon}></Marker>
        </Map>
        :
        null
        }
      </div>
    </>
  );
}

export default TargetMap;
