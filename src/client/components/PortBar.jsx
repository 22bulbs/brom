import React from 'react';
import LabeledText from './LabeledText';
import Icon from './Icon';

const PortBar = ({ app, proxy, results }) => (
  <div id="port-bar">
    <span id="brom-title">brom</span>
    <div>
      <span>
        <LabeledText label="Application Port" text={app} />|
        <LabeledText label="Proxy Port" text={proxy} />|
        <LabeledText label="Results Port" text={results} />
      </span>
      <Icon flag="connected" />
    </div>
  </div>
);

export default PortBar;
