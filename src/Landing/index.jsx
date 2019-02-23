import React from 'react';
import * as d3 from 'd3';

import chroma from 'chroma-js';
import {
  stickman1,
  questionmark,
  stickman2,
  stickman3,
  stickman4,
  bar,
  dot
} from './stickmen';

import {ArcPath, SimplePath} from '../ArcPath';

const BLACK = '#404040';
const BLUE = '#0362a4';
const ORANGE = '#f7823d';
const PURPLE = '#253583';
const GREEN = '#56a567';
const LIGHTBLUE = '#01a9d0';
const YELLOW = '#f8c640';

function ellipseGen(myr) {
  return (
    `M${0},${0} ` +
    `m${-myr}, 0 ` +
    `a${myr / 2},${myr / 2.8} 1 1,1 ${myr * 2},0 ` +
    `a${myr / 2},${myr / 2.8} 1 1,1 ${-myr * 2},0`
  );
}

const AnimPath = props => (
  <SimplePath times={Infinity} interval={300} {...props} />
);

export default function Landing(props) {
  const {width, height, radius: initRadius = 100} = props;
  const pathStyle = {stroke: BLACK, fill: 'none', strokeWidth: 2};
  const invisiblePathStyle = {
    stroke: 'transparent',
    fill: 'none',
    strokeWidth: 4
  };

  const radius = initRadius - 120;
  console.log('initRadius', initRadius);

  const circleGen = d3
    .arc()
    .innerRadius(0)
    .outerRadius((initRadius * 5) / 10)
    .startAngle(0)
    .endAngle(Math.PI * 2);

  const bottomCircleGen = d3
    .arc()
    .startAngle(((90 * Math.PI) / 2) * 180)
    .outerRadius(radius - 20);

  const topCircleGen = d3
    .arc()
    .startAngle(Math.PI)
    .outerRadius(radius);

  // .innerRadius(width - 10);
  const circleD = bottomCircleGen({startAngle: 0, endAngle: 360});

  const svgRef = React.createRef();
  const stickmmenSketchOpts = {
    roughness: 0.2,
    bowing: 100,
    strokeWidth: 1.5,
    stroke: BLACK,
    fillStyle: 'zigzag'
  };
  const titleStyle = {
    fontSize: '12vh',
    fontFamily: 'Cabin Sketch',
    fontStyle: 'bold',
  };
  const ell = ellipseGen(300);
  console.log('ell', ell);
  return (
    <section>
      <svg ref={svgRef} width={width} height={height}>
        <g style={{transform: `translate(${width / 2}px, ${width / 2}px)`}}>
          <SimplePath
            svgRef={svgRef}
            d={circleGen({startAngle: 0, endAngle: 2 * Math.PI})}
            sketchOpts={{
              bowing: 0,
              roughness: 2,
              strokeWidth: 2,
              fill: 'none',
              stroke: '#404040',
              bowing: 0,
              sketch: 1.8,
              strokeWidth: 2,
              fillWeight: 5,
              // fill: 'none', // chroma(LIGHTBLUE).alpha(0.24),
              // stroke: 'none',
              fillStyle: 'zigzag'
            }}
            style={
              {
                // transform: `translate(${radius}, ${radius})`,
                // stroke: 'black',
                // fill: data.fill
              }
            }
          />
          <SimplePath
            svgRef={svgRef}
            d={circleGen({startAngle: 0, endAngle: 2 * Math.PI})}
            sketchOpts={{
              bowing: 0,
              sketch: 10.8,
              strokeWidth: 2,
              fillWeight: 5,
              stroke: 'none',
              fillStyle: 'zigzag'
            }}
            style={
              {
                // transform: `translate(${radius}, ${radius})`,
                // stroke: 'black',
                // fill: data.fill
              }
            }
          />
          <SimplePath
            svgRef={svgRef}
            d={circleGen({startAngle: 0, endAngle: 2 * Math.PI})}
            sketchOpts={{
              bowing: 0,
              roughness: 8,
              sketch: 1.8,
              strokeWidth: 2,
              fillWeight: 5,
              fill: chroma(LIGHTBLUE).alpha(0.14),
              stroke: 'none',
              fillStyle: 'zigzag'
            }}
            style={
              {
                // transform: `translate(${radius}, ${radius})`,
                // stroke: 'black',
                // fill: data.fill
              }
            }
          />
          <path d={circleD} id="bottomTitle" style={invisiblePathStyle} />
          <path
            d={topCircleGen({startAngle: 0, endAngle: 160})}
            id="topTitle"
            style={invisiblePathStyle}
          />
          <g style={titleStyle}>
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
              // display: 'none',
              transform: `translate(${-radius / 2}px, ${-40}px)`
            }}>
            <g style={{transform: `translate(-100px,100px) scale(2)`}}>
              <AnimPath
                svgRef={svgRef}
                d={stickman1}
                sketchOpts={{...stickmmenSketchOpts, fill: YELLOW}}
                style={{...pathStyle}}
              />
            </g>
            <g
              style={{
                transform: `translate(${radius / 2 +
                  radius / 7}px, ${100}px) scale(2)`
              }}>
              <AnimPath
                svgRef={svgRef}
                sketchOpts={{
                  ...stickmmenSketchOpts,
                  fill: GREEN,
                  // bowing: 50,
                  // roughness: 0.2,
                  // stroke: BLACK
                }}
                d={stickman2}
                style={{...pathStyle}}
              />
            </g>

            <g
              style={{
                transform: `translate(${radius / 2 +
                  radius / 3}px, ${100}px) scale(2)`
              }}>
              <AnimPath
                d={stickman3}
                sketchOpts={{...stickmmenSketchOpts, fill: ORANGE}}
                svgRef={svgRef}
                style={pathStyle}
              />
            </g>
            <g
              style={{
                transform: `translate(${radius + 100}px, 70px) scale(2) `
              }}>
              <AnimPath
                sketchOpts={{...stickmmenSketchOpts, fill: 'tomato'}}
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
