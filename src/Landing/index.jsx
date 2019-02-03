import React from 'react';
import * as d3 from 'd3';

import {stickman1, stickman2, stickman3, stickman4} from './stickmen';

export default function Landing(props) {
  const {width, height, radius: initRadius} = props;
  const pathStyle = {stroke: 'black', fill: 'none', strokeWidth: 4};

  const radius = initRadius - 100;

  const circleGen = d3
    .arc()
    // TODO: padding
    .outerRadius(radius);
  // .innerRadius(width - 10);
  const circleD = circleGen({startAngle: 0, endAngle: 360});

  console.log('circleD', circleD);
  return (
    <section>
      <svg width={width} height={height}>
        <g style={{transform: `translate(${width / 2}px, ${width / 2}px)`}}>
          <path d={circleD} style={pathStyle} />
          <g
            style={{
              transform: `translate(${-radius / 2}px, ${0}px)`
            }}>
            <g style={{transform: `scale(1)`}}>
              <path d={stickman1} style={pathStyle} />
            </g>
            <g style={{transform: `translate(${100}px)`}}>
              <path d={stickman2} style={pathStyle} />
            </g>
            <g style={{transform: `translate(${200}px)`}}>
              <path d={stickman3} style={pathStyle} />
            </g>
            <g style={{transform: `translate(${300}px)`}}>
              <path d={stickman4} style={pathStyle} />
            </g>
          </g>
        </g>
      </svg>
    </section>
  );
}
