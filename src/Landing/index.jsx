import React from 'react';
import * as d3 from 'd3';

import chroma from 'chroma-js';
import {stickman1, stickman2, stickman3, stickman4} from './stickmen';

import {ArcPath, SimplePath} from '../ArcPath';

const BLACK = '#404040';

export default function Landing(props) {
  const {width, height, radius: initRadius = 100} = props;
  const pathStyle = {stroke: 'black', fill: 'none', strokeWidth: 4};
  const invisiblePathStyle = {
    stroke: 'transparent',
    fill: 'none',
    strokeWidth: 4
  };

  const radius = initRadius - 100;
  console.log('initRadius', initRadius);

  const circleGen = d3
    .arc()
    .innerRadius(0)
    .outerRadius((initRadius * 5) / 9)
    .startAngle(0)
    .endAngle(Math.PI * 2);

  const topCircleGen = d3
    .arc()
    .startAngle(((90 * Math.PI) / 2) * 180)
    // .endAngle((-90 * Math.PI) / 180 + 2 * Math.PI)

    // TODO: padding
    .outerRadius((radius * 3) / 4);

  const bottomCircleGen = d3
    .arc()
    .startAngle(Math.PI)
    // .startAngle(((90 * Math.PI) / 2) * 180)
    // .endAngle((-90 * Math.PI) / 180 + 2 * Math.PI)

    // TODO: padding
    .outerRadius((radius * 3) / 4);

  // .innerRadius(width - 10);
  const circleD = topCircleGen({startAngle: 0, endAngle: 360});

  const svgRef = React.createRef();
  console.log('circleD', circleD);
  const stickmmenSketchOpts = {
    sketch: 10,
    bowing: 10,
    strokeWidth: 2,
    stroke: BLACK,
  };
  return (
    <section>
      <svg ref={svgRef} width={width} height={height}>
        <g style={{transform: `translate(${width / 2}px, ${width / 2}px)`}}>
          <SimplePath
            svgRef={svgRef}
            d={circleGen({startAngle: 0, endAngle: 2 * Math.PI})}
            sketchOpts={{
              bowing: 10,
              sketch: 5.8,
              strokeWidth: 2,
              fillWeight: 5,
              fill: chroma('lightblue').alpha(0.5),
              stroke: '#404040',
              fillStyle: 'hachure'
            }}
            style={
              {
                // transform: `translate(${radius}, ${radius})`,
                // stroke: 'black',
                // fill: data.fill
              }
            }
          />
          <path
            d={circleD}
            id="bottomTitle"
            style={pathStyle}
            style={invisiblePathStyle}
          />
          <path
            d={bottomCircleGen({startAngle: 0, endAngle: 160})}
            id="topTitle"
            style={invisiblePathStyle}
          />
          <g
            style={{
              fontSize: '12vh',
              fontFamily: 'Cabin Sketch',
              fontStyle: 'bold'
            }}>
            <text x={5} dy={-30}>
              <textPath
                xlinkHref="#topTitle"
                textAnchor="middle"
                startOffset="50%"
                fill={BLACK}>
                *Humus*
              </textPath>
            </text>
            <text x={5} dy={100} style={{fontSize: 100}}>
              <textPath
                xlinkHref="#bottomTitle"
                textAnchor="middle"
                startOffset="50%"
                fill={BLACK}>
                Festival
              </textPath>
            </text>
          </g>
          <g
            style={{
              transform: `translate(${-radius / 2}px, ${-40}px)`
            }}>
            <g style={{transform: `translate(-100px) scale(2)`}}>
              <SimplePath
                svgRef={svgRef}
                d={stickman1}
                sketchOpts={stickmmenSketchOpts}
                style={pathStyle}
              />
            </g>
            <g style={{transform: `translate(${100}px, ${-50}px) scale(2)`}}>
              <SimplePath
                svgRef={svgRef}
                sketchOpts={stickmmenSketchOpts}
                d={stickman2}
                style={pathStyle}
              />
            </g>
            <g style={{transform: `translate(${200}px, ${40}px) scale(2)`}}>
              <SimplePath
                sketchOpts={stickmmenSketchOpts}
                d={stickman3}
                svgRef={svgRef}
                style={pathStyle}
              />
            </g>
            <g style={{transform: `translate(${radius + 80}px) scale(2) `}}>
              <SimplePath
                sketchOpts={stickmmenSketchOpts}
                d={stickman4}
                svgRef={svgRef}
                style={pathStyle}
              />
            </g>
          </g>
        </g>
      </svg>
    </section>
  );
}
