import React, {useState, useMemo, useEffect} from 'react';

import chroma from 'chroma-js';

import {line} from 'd3';

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

import img0 from './aurora_1.jpg';
import img1 from './aurora_2.jpg';
import img2 from './humus_2017_0.jpg';
import img3 from './humus_2017_1.jpg';

const makeLine = line();

const BLACK = '#404040';

const verticalText = {
  transform: 'translate(-25%,0%) rotate(90deg)'
  // transformOrigin: 'left top 0',
};

const sketchOpts = {
  bowing: 20,
  roughness: 0.9,
  strokeWidth: 4,
  fillWeight: 10,
  fill: chroma('#01a9d0').alpha(0.2),
  stroke: BLACK,
  fillStyle: 'zigzag'
};

// const text =
//   'Humus Campus, ormai giunto alla sua terza edizione, è un percorso intensivo di auto-formazione, ricerca e condivisione per artisti e persone interessate ad approfondire lo studio del movimento-corpo, le sue caratteristiche funzionali e le sue possibilità espressive, comunicative, rituali e curative.';

export default function AuroraExpress(props) {
  const {className, width, circleWidth, phone, height, style} = props;

  const [extId, setExtId] = useState(null);
  const updateExtId = id => setExtId(id === extId ? null : id);

  const extend = (id, defClass) => (id === extId ? 'extendedClip' : defClass);

  return (
    <div
      className=" flex flex-col w-full h-full items-center relative"
      style={{fontFamily: "'Cabin Sketch'", width}}>
      <h1 className="mb-4">Aurora Express</h1>
      <div className="p-4 flex-grow flex flex-col">
        <Description className="max-h-48" more>
          <div className="small-letter md:big-letter">?</div>
          {text}
        </Description>
        <div className="mt-6 bg-white flex-grow flex relative">
          <div
            style={{
              backgroundImage: `url(${img0}) `,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100%',
            }}
            src={img0}
            className="h-full w-3/4 clip-right-0 absolute right-0 bottom-0"
          />
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full pointer-events-none">
            <text>
              <textPath
                style={{fontSize: 10.9, transform: 'skewX(30deg)'}}
                href="#MyPath">
                Humus Campus 2017
              </textPath>
            </text>

            <path
              d={makeLine([[42, 100], [65, 0]])}
              id="MyPath"
              fill="none"
              stroke="transparent"
            />
          </svg>
          <div
            className="z-50 whitespace-no-wrap absolute vertical-text"
            style={{left: '36%'}}
          />
          <div
            style={{
              backgroundImage: `url(${img1}) `,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100%',
            }}
            src={img1}
            className="
            absolute right-0
            h-full clip-left-0"
          />
          <div
            style={{
              backgroundImage: `url(${img2}) `,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100%',
            }}
            className="
            absolute right-0
            h-full clip-left-1"
          />
          <div
            onClick={() => updateExtId(3)}
            style={{
              backgroundImage: `url(${img3}) `,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100%',
            }}
            className={`absolute right-0 h-full clip-right-1 ${extend(3)}`}
          />
        </div>
      </div>
    </div>
  );
}
