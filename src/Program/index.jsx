import React, {useState, useMemo, useEffect} from 'react';

import * as d3 from 'd3';
import chroma from 'chroma-js';

import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import {styler, tween, easing} from 'popmotion';

import posed, {PoseGroup} from 'react-pose';
import {FIRE, WATER, EARTH, AIR, icons} from '../alchemyElements';

import {SimplePath} from '../ArcPath';

import events from './events';

const eventTypes = [FIRE, WATER, EARTH, AIR];

const textColor = {
  [FIRE]: 'text-red',
  [WATER]: 'text-blue',
  [EARTH]: 'text-yellow-darker',
  [AIR]: 'text-green',
};

const stickman =
  'm 0,0 -1.54965,-2.12887 0.7098,-2.93861 5.17338,2.06968 -1.88768,-13.88638 -1.05749,-4.34342 1.22144,-2.6793 v 0 l -2.34926,-3.25586 -0.44745,-3.03334 -0.96391,-9.89753 1.41136,12.93087 2.34926,3.25586 -2.43183,1.80091 -3.36705,-0.0184 -0.58691,-1.73631 0.87291,-3.1466 -1.96405,-4.10514 -1.34243,-4.18764 -0.67118,-5.10689 v -4.18764 0 l 1.56614,-4.80044 2.90858,-1.83847 3.46794,-1.02138 -0.11184,-2.85985 -2.39882,-2.38854 v 0 l -0.77205,-3.58833 v 0 l 1.68352,-3.1859 2.34924,-1.32779 2.49415,-0.64236 3.13234,1.63418 1.53542,2.04274 0.14258,3.57483 -0.78305,2.96199 -0.22375,1.83844 2.57298,0.71494 2.57296,0.81711 1.67804,0.51067 1.78989,1.83853 1.1187,2.55338 v 4.08549 l 0.44745,4.90265 0.82145,4.80044 -0.51505,3.34231 2.41679,2.22067 -1.01673,1.95513 c -1.00914,0.75444 -1.80004,2.0399 -2.80917,0.51476 l -1.77071,-1.94942 -0.87345,-2.53104 -0.18084,-3.4727 0.13791,-7.12721 0.043,10.41801 0.87346,2.71294 1.97847,5.15167 v 0 l 1.1187,6.12821 1.90177,8.47739 -1.47201,5.24856 4.95643,-2.10567 2.77468,1.72034 -0.74246,2.92896 -4.42975,0.86668 h -3.16412 l -2.53126,-0.14444 -0.63286,-4.91108 -0.94923,-4.18891 -0.3164,-3.75555 -1.72398,-7.97333 -3.94957,0.51321 v 0 l 0.37125,7.12192 0.3979,8.57152 -0.31639,6.06665 z';

const Item = posed.li({
  // You can make a custom transition for the flip-powered
  // shuffling animation by overriding `flip`. You can even
  // add other properties to animate while the flip animation
  // is in progress. Uncomment the following code to try it out!
  // flip: {
  //   scale: 1,
  //   transition: {
  //     scale: {
  //       type: 'spring',
  //       velocity: 10
  //     },
  //     default: {
  //       type: 'spring'
  //     }
  //   }
  // }
});

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

export default function Program(props) {
  const {className, width, circleWidth, height, style} = props;
  const svgRef = React.useRef();

  const [set, setFilterSet] = useState([]);

  return (
    <div
      className={`${className} flex flex-col w-full h-full items-center justify-center relative`}
      style={{fontFamily: "'Cabin Sketch'", width}}>
      <h1 className="m-8">Program</h1>
      <ul className="mx-8 mb-4 overflow-y-auto list-reset w-full">
        <PoseGroup>
          {events.map(d => (
            <Item
              key={d.id}
              className={` flex justify-between m-1 p-2
                 ${textColor[d.type]}
`}>
              <div>{d.title}</div>
              <div>{d.date}</div>
            </Item>
          ))}
        </PoseGroup>
      </ul>
      <svg className="absolute" style={{width, height}} ref={svgRef}>
        <SimplePath
          d={stickman}
          times={50}
          interval={300}
          sketchOpts={{
            roughness: 0.25,
            bowing: 100,
            strokeWidth: 1,
            stroke: BLACK,
            fillStyle: 'zigzag',
            fillWeight: 5,
            fill: 'rgba(1,169,208,0.14)'
          }}
          svgRef={svgRef}
          style={{
            transform: `translate(${width / 2}px, ${(height * 2) /
              3}px) scale(${4.5})`
          }}
        />
      </svg>
      <div className="mx-4 flex-grow flex-no-shrink flex flex-wrap">
        {eventTypes.map(d => (
          <div className="text-3xl flex items-center justify-center mb-1">
            <div onClick={() => setFilterSet()}>{d}</div> <div>{icons[d]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
