import React from 'react';
import { VictoryPie, VictoryLabel } from 'victory';
import CustomLabel from './CustomLabel';
import colorMap from '../utils/colorMap'

const MethodDonut = ({methods}) => (
   <svg viewBox="0 0 400 400" width="200" height="200">
    <VictoryPie
      standalone={false}
      renderInPortal={false}
      width={400} height={400}
      data={methods}
      innerRadius={130} labelRadius={10000} radius={200}
      style={{ labels: { fontSize: 30, fill: "white" },
      data: { fill: (d) => colorMap(d.x) }}}
      labels={(d) => {
        return `${d.x}\n${d.y}`
      }}
      labelComponent={<CustomLabel />}
    />
  </svg>
)

export default MethodDonut;