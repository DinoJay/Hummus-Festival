import React, {useState, useMemo, useEffect} from 'react';

import * as d3 from 'd3';
import chroma from 'chroma-js';

import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import {styler, tween, easing} from 'popmotion';

import {SimplePath} from '../ArcPath';
import {stickman, bike} from './stickmanPath.js';

const BLACK = '#404040';

const verticalText = {
  transform: 'translate(-25%,0%) rotate(90deg)',
  // transformOrigin: 'left top 0',
};

const sketchOpts = {
  bowing: 20,
  roughness: 0.9,
  strokeWidth: 4,
  fillWeight: 10,
  fill: chroma('#01a9d0').alpha(0.2),
  stroke: BLACK,
  fillStyle: 'zigzag',
};

console.log(
  'gold',
  chroma('gold')
    .alpha(0.14)
    .css(),
);

const text =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';

function MissionStatement(props) {
  const {className, width, circleWidth, height, style} = props;
  const svgRef = React.useRef();

  return (
    <div
      className={`${className} background flex flex-col w-full h-full items-center justify-center relative`}
      style={{fontFamily: "'Cabin Sketch'", width}}>
      <div className="absolute pin-t pin-l h-64 m-8 overflow-hidden">
        <div className="speech-bubble border-yo border-black p-4 w-full h-full">
          <div
            className="float-left"
            style={{
              fontSize: 100,
              shapeOutside: 'ellipse(50%)',
              width: 70,
              height: 100,
            }}>
            ?
          </div>
          {text}
        </div>
      </div>

      <svg
        ref={svgRef}
        style={{width: '100%', height: '100%'}}
        preserveAspectRatio="xMaxYMin meet">
        <g transform={`translate(${width / 2},${height / 2 + 20})`}>
          <SimplePath
            sketchOpts={sketchOpts}
            svgRef={svgRef}
            d={stickman}
            style={{transform: 'scale(1)'}}
          />
        </g>
        <g transform={`translate(${-80},${height - 50})`}>
          <SimplePath
            sketchOpts={{...sketchOpts, fill: 'none'}}
            svgRef={svgRef}
            d={bike}
            style={{transform: 'scale(1) rotate(-15deg)'}}
          />
        </g>
      </svg>
    </div>
  );
}

export default MissionStatement;
