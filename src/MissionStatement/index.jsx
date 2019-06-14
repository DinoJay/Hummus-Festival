import React, {useState, useMemo, useEffect} from 'react';

import chroma from 'chroma-js';

import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';
// import isEqual from 'lodash/isEqual';
// import cloneDeep from 'lodash/cloneDeep';
// import sortBy from 'lodash/sortBy';
import {styler, tween, easing} from 'popmotion';
import Description from '../components/utils/Description';

import {SimplePath, Svg} from '../ArcPath';
import {stickman, bike} from './stickmanPath.js';
import {seg0, seg1, seg2, seg3, seg4} from './campusLogoSegments.js';

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
  'Humus Campus, ormai giunto alla sua terza edizione, è un percorso intensivo di auto-formazione, ricerca e condivisione per artisti e persone interessate ad approfondire lo studio del movimento-corpo, le sue caratteristiche funzionali e le sue possibilità espressive, comunicative, rituali e curative.';

function MissionStatement(props) {
  const {className, width, circleWidth, phone, height, style} = props;
  const svgRef = React.useRef();

  const stickmanScale = width / 550;
  const [sketch, setSketch] = useState(sketchOpts);

  console.log('Sketch', sketch);
  return (
    <div
      className={`${className} flex flex-col w-full h-full items-center relative`}
      style={{fontFamily: "'Cabin Sketch'", width}}>
      <h1 className="mb-4">Info</h1>
      <div className="p-4">
        <Description className="max-h-64">
          <div
            className="small-letter md:big-letter"
            style={
              {
                // fontSize: 100,
                // shapeOutside: 'ellipse(50%)',
                // width: 70,
                // height: 100,
              }
            }>
            ?
          </div>
          {text}
        </Description>
      </div>
      <Svg
        className="md:mt-12 w-full overflow-visible"
        style={{height: height / (phone ? 2.3 : 2)}}>
        <g transform={`translate(${width / 2},${20}) scale(${stickmanScale})`}>
          <SimplePath
            onMouseOver={() =>
              setSketch({
                ...sketchOpts,
                roughness: 4
              })
            }
            onMouseOut={() =>
              setSketch({
                ...sketchOpts,
                roughness: 0.9
              })
            }
            times={1000}
            interval={500}
            sketchOpts={sketch}
            svgRef={svgRef}
            d={stickman}
            style={{transform: 'scale(1)'}}
          />
        </g>
        <g transform={`translate(${-40},${-40}) scale(${stickmanScale})`}>
          <SimplePath
            times={1000}
            interval={500}
            sketchOpts={{
              ...sketchOpts,
              strokeWidth: 3,
              roughness: 2,
              bowing: 3,
              fill: 'none'
            }}
            d={seg0}
            style={{transform: 'scale(1.5) rotate(0deg)'}}
          />
          <SimplePath
            times={1000}
            interval={500}
            sketchOpts={{
              ...sketchOpts,
              strokeWidth: 3,
              roughness: 2,
              bowing: 3,
              fill: 'none'
            }}
            d={seg1}
            style={{transform: 'scale(1.5) rotate(0deg)'}}
          />
          <SimplePath
            times={1000}
            interval={500}
            sketchOpts={{
              ...sketchOpts,
              strokeWidth: 3,
              roughness: 2,
              bowing: 3,
              fill: 'none'
            }}
            d={seg2}
            style={{transform: 'scale(1.5) rotate(0deg)'}}
          />
          <SimplePath
            times={1000}
            interval={500}
            sketchOpts={{
              ...sketchOpts,
              strokeWidth: 3,
              roughness: 2,
              bowing: 3,
              fill: 'none'
            }}
            d={seg3}
            style={{transform: 'scale(1.5) rotate(0deg)'}}
          />
          <SimplePath
            times={1000}
            interval={500}
            sketchOpts={{
              ...sketchOpts,
              strokeWidth: 2,
              roughness: 2,
              bowing: 3,
              fill: 'none'
            }}
            d={seg4}
            style={{transform: 'scale(1.5) rotate(0deg)'}}
          />
        </g>
      </Svg>
    </div>
  );
}

export default MissionStatement;
