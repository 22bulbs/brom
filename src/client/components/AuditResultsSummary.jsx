/* eslint react/prop-types: 0 */
import React from 'react';
import DestinationDonut from './DestinationDonut';
import MethodDonut from './MethodDonut';
import PortBar from './PortBar';
import LabeledText from './LabeledText';


const AuditResultsSummary = ({
  ports,
  title,
  protocol,
  methods,
  totals,
  socketStatus,
}) => {
  const methodData = [];
  for (const method in methods) {
    methodData.push({
      x: method,
      y: methods[method],
    });
  }

  return title ? (
    <div className="audit-results">
      <PortBar {...ports} socketStatus={socketStatus}/>
      <div className="title-info">
        <h1 id="app-title">{title}</h1>
        <p>
          <LabeledText label="Protocol" text={protocol} />
        </p>
      </div>
      <div className="global-data">
        <div className="numbers">
          <p>
            <span style={{ fontSize: '3em' }}>
              {totals.transactions}
            </span>
            <strong>Transactions</strong>
          </p>
          <p>
            <LabeledText
              label="Potential Vulnerabilities"
              text={totals.severe}
            />
          </p>
          <p>
            <LabeledText
              label="Deprecated"
              text={totals.deprecated}
            />
          </p>
          <p>
            <LabeledText
              label="Conflicting"
              text={totals.conflicting}
            />
          </p>
          <p>
            <LabeledText
              label="Redundant"
              text={totals.redundant}
            />
          </p>
        </div>
        <div className="charts">
          <MethodDonut methods={methodData} />
          <DestinationDonut
            internal={totals.internal}
            external={totals.external}
          />
        </div>
      </div>
    </div>
  ) : <div />;
};

export default AuditResultsSummary;
