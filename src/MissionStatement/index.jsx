import React, {useState, useMemo, useEffect} from 'react';

import chroma from 'chroma-js';

import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import {styler, tween, easing} from 'popmotion';
import Description from '../components/utils/Description';

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

const text =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';

function MissionStatement(props) {
  const {className, width, circleWidth, height, style} = props;
  const svgRef = React.useRef();

  const stickmanScale = width / 550;
  return (
    <div
      className={`${className} flex flex-col w-full h-full items-center relative`}
      style={{fontFamily: "'Cabin Sketch'", width}}>
      <h1 className="mb-4">Info</h1>
      <Description className="pin-t pin-l ml-2 mr-4">
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
      </Description>
      <svg
        className="mt-auto flex-grow w-full overflow-visible"
        ref={svgRef}
        preserveAspectRatio="xMaxYMin meet">
        <g transform={`translate(${width / 2},${20}) scale(${stickmanScale})`}>
          <SimplePath
            sketchOpts={sketchOpts}
            svgRef={svgRef}
            d={stickman}
            style={{transform: 'scale(1)'}}
          />
        </g>
        <g
          transform={`translate(${-80 * stickmanScale},${20 +
            height / 4}) scale(${stickmanScale})`}>
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
