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
const GREEN = '#38c172';
const LIGHTBLUE = '#01a9d0';
const YELLOW = '#f8c640';

console.log(
  'LIGHTBLUE',
  chroma(LIGHTBLUE)
    .alpha(0.14)
    .css(),
);
function ellipseGen(myr) {
  return (
    `M${0},${0} ` +
    `m${-myr}, 0 ` +
    `a${myr / 2},${myr / 2.8} 1 1,1 ${myr * 2},0 ` +
    `a${myr / 2},${myr / 2.8} 1 1,1 ${-myr * 2},0`
  );
}

const NUM_ANIM_TIMES = 10;

const AnimPath = props => (
  <SimplePath times={NUM_ANIM_TIMES} interval={500} {...props} />
);

const stickmmenSketchOpts = {
  roughness: 0.25,
  bowing: 100,
  strokeWidth: 1.5,
  stroke: BLACK,
  fillStyle: 'zigzag',
};

export default function Landing(props) {
  const {width, circleWidth, height, className} = props;
  const pathStyle = {stroke: BLACK, fill: 'none', strokeWidth: 2};
  const invisiblePathStyle = {
    stroke: 'transparent',
    fill: 'none',
    strokeWidth: 4
  };
  const radius = circleWidth / 2;
  const titleStyle = {
    fontSize: radius / 2,
    fontFamily: 'Cabin Sketch',
    fontStyle: 'bold',
  };
  const circleGen = d3
    .arc()
    .innerRadius(0)
    .outerRadius((circleWidth * 5) / 10)
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

  const stickmanScale = width / 250;

  const offset = 30;
  return (
    <section className={className}>
      <svg ref={svgRef} width={width} height={width + offset}>
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
                // filter: 'url(#gooey)'
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
          <g>
            <text x={5} dy={-30} style={{...titleStyle}}>
              <textPath
                xlinkHref="#topTitle"
                textAnchor="middle"
                startOffset="50%"
                fill={BLACK}>
                *Humus*
              </textPath>
            </text>
            <text x={5} dy={100} style={{...titleStyle}}>
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
              transform: `translate(${-radius / 2 -
                10 * stickmanScale}px, ${-40}px)`
            }}>
            <AnimPath
              svgRef={svgRef}
              d={stickman1}
              sketchOpts={{...stickmmenSketchOpts, fill: YELLOW}}
              style={{
                transform: `translate(${-radius /
                  1.5}px,100px) scale(${stickmanScale})`,
                ...pathStyle,
              }}
            />
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
              style={{
                transform: `translate(${radius / 2 +
                  radius / 7}px, ${100}px) scale(${stickmanScale})`,
                ...pathStyle,
              }}
            />
            <AnimPath
              d={stickman3}
              sketchOpts={{...stickmmenSketchOpts, fill: ORANGE}}
              svgRef={svgRef}
              style={{
                ...pathStyle,
                transform: `translate(${radius / 2 +
                  radius / 3}px, ${100}px) scale(${stickmanScale})`
              }}
            />
            <AnimPath
              sketchOpts={{...stickmmenSketchOpts, fill: 'tomato'}}
              d={stickman4}
              svgRef={svgRef}
              style={{
                ...pathStyle,
                transform: `translate(${radius * 2 -
                  20 * stickmanScale}px, 70px) scale(${stickmanScale}) `
              }}
            />
          </g>
        </g>
      </svg>
      <div
        className="text-3xl text-green italic mt-24 p-4 uppercase"
        style={{fontFamily: 'Cabin Sketch'}}>
        Move your body and your mind fill follow!
      </div>
    </section>
  );
}
