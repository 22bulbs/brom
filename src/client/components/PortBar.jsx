import React from 'react';
import LabeledText from './LabeledText';

const PortBar = ({ app, proxy, results }) => (
  <div id="port-bar">
    <span id="brom-title">brom</span>
    <div>
      <span>
        <LabeledText label="Application Port" text={app} />|
        <LabeledText label="Proxy Port" text={proxy} />|
        <LabeledText label="Results Port" text={results} />
      </span>
      <i>autorenew</i>
    </div>
  </div>
);

export default PortBar;
