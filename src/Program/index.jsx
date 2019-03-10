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
import {SimplePath} from '../ArcPath';

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

const FIRE = 'FIRE';
const WATER = 'WATER';
const TERRA = 'TERRA';
const AIR = 'AIR';

const items = [
  {title: 'Event', date: '24/06/19', tag: FIRE},
  {title: 'Event 1', date: '24/06/19', tag: WATER},
  {title: 'Event 2', date: '24/06/19', tag: FIRE},
  {title: 'YOYO EVENT', date: '24/06/19', tag: WATER},
  {title: 'WOrkShop', date: '24/06/19', tag: TERRA},
  {title: 'yoyo event what', date: '24/06/19', tag: WATER},
  {title: 'another event yoyo', date: '24/06/19', tag: AIR},
  {title: 'dance workshop', date: '24/06/19', tag: AIR},
  {title: 'tarot night', date: '24/06/19', tag: FIRE},
  {title: 'music jam', date: '24/06/19', tag: WATER},
  {title: 'DIY workshop', date: '24/06/19', tag: AIR},
  {title: 'Bike atelier', date: '24/06/19', tag: TERRA},
  {title: 'another free jam party', date: '24/06/19', tag: WATER},
  {title: 'Vogueing workshop', date: '24/06/19', tag: WATER},
  {title: 'Disco Party', date: '24/06/19', tag: AIR},
  {title: 'Dance Improvisation', date: '24/06/19', tag: FIRE},
  {title: 'House Party', date: '24/06/19', tag: WATER},
  {title: 'History of dance music', date: '24/06/19', tag: WATER},
  {title: 'DJ workshop', date: '24/06/19', tag: AIR},
  {title: 'mask workshop', date: '24/06/19', tag: AIR},
  {title: 'final parade', date: '24/06/19', tag: TERRA},
].map((d, i) => ({id: i, ...d}));

export default function Program(props) {
  const {className, width, circleWidth, height, style} = props;
  const svgRef = React.useRef();

  return (
    <div
      className={`${className} background flex flex-col w-full h-full items-center justify-center relative`}
      style={{fontFamily: "'Cabin Sketch'", width}}>
      <ul className="overflow-y-auto list-reset">
        <PoseGroup>
          {items.map(d => (
            <Item key={d.id} className="m-1 p-2">
              {d.title}
            </Item>
          ))}
        </PoseGroup>
      </ul>
    </div>
  );
}
