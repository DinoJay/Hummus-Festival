import React, {useState, useMemo, useEffect} from 'react';

import * as d3 from 'd3';
import chroma from 'chroma-js';

import uniqBy from 'lodash/uniqBy';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import {styler, tween, easing} from 'popmotion';

import posed, {PoseGroup} from 'react-pose';
import {SimplePath} from '../ArcPath';

import apeOrgaPath from './Ape_Orga.js';
import apeLogo from '../apeLogo.js';

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

console.log(
  'gold',
  chroma('gold')
    .alpha(0.14)
    .css(),
);

const text =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';

const Segment = props => {
  const {children, className} = props;
  return (
    <div className="p-2 w-full">
      <div className="flex-grow border-yo m-4  border-black box-shadow-black  p-4 flex">
        {children}
      </div>
    </div>
  );
};

export default function Program(props) {
  const {className, width, circleWidth, height, style} = props;
  const svgRef = React.useRef();

  return (
    <div
      className={`${className} flex w-full flex-col h-full items-center justify-center relative`}
      style={{fontFamily: "'Cabin Sketch'", width}}>
      <h1 className="m-8">About</h1>
      <Segment>
        <svg
          preserveAspectRatio="xMidYMid none"
          height={140}
          width={220}
          ref={svgRef}>
          <SimplePath
            sketchOpts={sketchOpts}
            svgRef={svgRef}
            d={apeOrgaPath}
            style={{transform: 'scale(2)'}}
          />
        </svg>
        <svg
          style={{transform: 'translateX(-50px)'}}
          className="mt-auto"
          preserveAspectRatio="xMidYMid none"
          height={100}
          width={100}
          ref={svgRef}>
          <SimplePath
            sketchOpts={sketchOpts}
            svgRef={svgRef}
            d={apeLogo}
            style={{transform: 'translate(-200) scale(1)'}}
          />
        </svg>
      </Segment>
      <Segment>MAgic Matthieu</Segment>
      <Segment>Contacts</Segment>
      <Segment>References</Segment>
    </div>
  );
}
