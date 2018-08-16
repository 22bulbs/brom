import React, { Component } from "react";
import { VictoryLabel, VictoryTooltip } from "victory";
import colorMap from '../utils/colorMap'

class CustomLabel extends Component {
  render() {
    const method = this.props.text.split('\n')[0]
    return (
      <g>
        <VictoryLabel {...this.props}/>
        <VictoryTooltip
          {...this.props}
          x={200} y={325}
          renderInPortal={false}
          text={this.props.text}
          style={{ fontSize: 30, fill: "#FFF4E5", fontFamily: "roboto"}}
          orientation="top"
          pointerLength={0}
          cornerRadius={125}
          width={250}
          height={250}
          flyoutStyle={{ fill: colorMap(method), stroke: 0}}
        />
      </g>
    );
  }
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

export default CustomLabel