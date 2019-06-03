import React, {useState, useMemo, useEffect} from 'react';

import chroma from 'chroma-js';

import uniqBy from 'lodash/uniqBy';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import {styler, tween, easing} from 'popmotion';

import posed, {PoseGroup} from 'react-pose';
import {SimplePath, Svg} from '../ArcPath';

import apeOrgaPath from './Ape_Orga.js';
import apeLogo from '../apeLogo.js';
import bikeLogo from './bikeLogo';

import {stickman1, stickman2, stickman3, stickman4} from './stickmen';

// import events, {FIRE, WATER, TERRA, AIR} from './events';

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
  transform: 'translate(-25%,0%) rotate(90deg)'
  // transformOrigin: 'left top 0',
};

const sketchOpts = {
  bowing: 20,
  roughness: 0.4,
  strokeWidth: 2,
  fillWeight: 10,
  fill: chroma('#01a9d0').alpha(0.2),
  stroke: BLACK,
  fillStyle: 'zigzag'
};

const Segment = props => {
  const {children, className} = props;
  return (
    <div className="px-2 w-full">
      <div
        className={`flex-grow border-yo ml-2 mr-6 mb-6 border-black box-shadow-black border-black border-2 border-solid p-4 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default function Program(props) {
  const {className, phone, width, circleWidth, height, style} = props;
  const svgRef = React.useRef();

  return (
    <div
      className={`${className} myFont relative overflow-y-auto`}
      style={{width}}>
      <h1 className="flex-shrink-0 text-center">About</h1>
      <Segment id="ape" className="">
        <Svg width="17rem" height={140} ref={svgRef}>
          <SimplePath
            sketchOpts={sketchOpts}
            d={apeOrgaPath}
            style={{transform: 'scale(2)'}}
          />
          <SimplePath
            sketchOpts={sketchOpts}
            d={apeLogo}
            style={{transform: 'translate(10rem, 2.5rem) scale(1)'}}
          />
        </Svg>
      </Segment>
      <Segment>
        <h3 className="mt-0">Contacts</h3>
        <div className="flex">
          <div className="md:text-lg">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2">Cristina:</div>
              <div>340 5903937</div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2">Michele:</div>
              <div>393 8905355</div>
            </div>
            <div>humuscampus@gmail.com</div>
            <div>facebook.com/estatefertile</div>
          </div>
          <Svg className="flex-grow overflow-visible" height={100} ref={svgRef}>
            <SimplePath
              className="bycicle"
              sketchOpts={{
                ...sketchOpts,

                roughness: 1.4,
                strokeWidth: 4,
                // fillWeight: 10,

                fill: null
              }}
              d={bikeLogo}
            />
          </Svg>
        </div>
      </Segment>
      <Segment>
        <h3>References</h3>
        <div>
          <Svg className="flex-grow overflow-visible" height={100}>
            <SimplePath
              className="about-stickman1"
              sketchOpts={{
                ...sketchOpts,

                roughness: 0.4,
                strokeWidth: 2,
                // fillWeight: 10,

                fill: null
              }}
              d={stickman1}
            />
            <SimplePath
              className="about-stickman2"
              sketchOpts={{
                ...sketchOpts,

                roughness: 0.4,
                strokeWidth: 2,
                // fillWeight: 10,

                fill: null
              }}
              d={stickman2}
            />
            <SimplePath
              className="about-stickman3"
              sketchOpts={{
                ...sketchOpts,

                roughness: 0.4,
                strokeWidth: 2,
                // fillWeight: 10,

                fill: null
              }}
              d={stickman3}
            />
            <SimplePath
              className="about-stickman4"
              sketchOpts={{
                ...sketchOpts,

                roughness: 0.4,
                strokeWidth: 2,
                // fillWeight: 10,

                fill: null
              }}
              d={stickman4}
            />
          </Svg>
          <div className="text-4xl">
            <span>A</span>
            <span>.</span>
            <span>T</span>
            <span>.</span>
            <span>C</span>
            <span>.</span>
            <span>Q</span>
          </div>
        </div>
      </Segment>
    </div>
  );
}
