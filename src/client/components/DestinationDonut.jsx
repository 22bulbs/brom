import React from 'react';
import { VictoryPie, VictoryLabel } from 'victory';

const DestinationDonut = ({internal, external}) => (
  <svg viewBox="0 0 400 400" width="200" height="200">
    <VictoryPie
      standalone={false}
      renderInPortal={false}
      width={400} height={400}
      data={[
        { x: 'External', y: external}, { x: 'Internal', y: internal }
      ]}
      innerRadius={130} labelRadius={150} radius={200}
      style={{ labels: { fontSize: 0, fill: "white" } }}
    />
    <VictoryLabel
      textAnchor="middle"
      style={{ fontSize: 30 }}
      x={200} y={200}
      text={internal + ' / ' + external}
    />
  </svg>
)

export default DestinationDonut