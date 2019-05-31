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
import text from './text';

import img0 from './aurora_1.png';
import img1 from './aurora_2.png';

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

// const text =
//   'Humus Campus, ormai giunto alla sua terza edizione, è un percorso intensivo di auto-formazione, ricerca e condivisione per artisti e persone interessate ad approfondire lo studio del movimento-corpo, le sue caratteristiche funzionali e le sue possibilità espressive, comunicative, rituali e curative.';

export default function AuroraExpress(props) {
  const {className, width, circleWidth, phone, height, style} = props;
  const svgRef = React.useRef();

  const stickmanScale = width / 550;

  return (
    <div
      className=" flex flex-col w-full h-full items-center relative"
      style={{fontFamily: "'Cabin Sketch'", width}}>
      <h1 className="mb-4">Aurora Express</h1>
      <div className="p-4 flex-grow flex flex-col">
        <Description className="max-h-48" more>
          <div
            className="big-letter"
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
        <div className="mt-6 flex-grow flex relative">
          <div
            style={{
              backgroundImage: `url(${img0}) `,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100%'
            }}
            src={img0}
            className="h-full w-3/4 clip-left absolute left-0"
          />
          <div
            className="z-50 whitespace-no-wrap absolute vertical-text"
            style={{left: '36%'}}>
            <div className="text-4xl aurora-label" style={{}}>
              Humus Festival 2017
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${img1}) `,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100%'
            }}
            src={img1}
            className="
            absolute right-0
            border-2 border-black border-solid
            h-full clip-right"
          />
        </div>
      </div>
    </div>
  );
}
