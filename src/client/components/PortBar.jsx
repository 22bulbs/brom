import React from 'react';
import LabeledText from './LabeledText';
import Icon from './Icon';

const PortBar = ({ app, proxy, results }) => (
  <div id="port-bar" className="border-bottom light-bg">
    <span id="brom-title">brom</span>
    <div className='ports'>
      <span>
        <LabeledText label="Application Port" text={app} />|
        <LabeledText label="Proxy Port" text={proxy} />|
        <LabeledText label="Results Port" text={results} />
      </span>
      <span style={{
        color: 'green'
      }}>
        <Icon flag="connected" />
      </span>
    </div>
  </div>
);

export default PortBar;
