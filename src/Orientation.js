import React from 'react';
import { round } from './round';

const Orientation = ({orientation}) => (
  <div className={'orientation'}>
    {
      orientation
      ?
      <div>
        {`Absolute: ${orientation.absolute}, `}
        {`α: ${round(orientation.alpha)}, `}
        {`β: ${round(orientation.beta)}, `}
        {`γ: ${round(orientation.gamma)}`}
      </div>
      :
      <div>No orientation available</div>
    }
  </div>
);
export default Orientation;
