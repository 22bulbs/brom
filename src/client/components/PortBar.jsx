import React from 'react';
import LabeledText from './LabeledText';
import Icon from './Icon';


  

const PortBar = ({ app, proxy, results, socketStatus }) => (
  <div id="port-bar" className="border-bottom light-bg">
    <span id="brom-title">brom</span>
    <div className='ports'>
      <span>
        <LabeledText label="Application Port" text={app} />|
        <LabeledText label="Proxy Port" text={proxy} />|
        <LabeledText label="Results Port" text={results} />
      </span>
      <span style={{
        color: socketStatus ? '#92CC98' : '#D15F5C'
      }}>
        <Icon flag="connected" />
      </span>
    </div>
  </div>
);

export default PortBar;
