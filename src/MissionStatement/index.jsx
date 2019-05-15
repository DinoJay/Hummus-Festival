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

const crossPath =
  'm 146.97271,44.483941 -38.66593,-3.29147 40.36553,-41.37859007 47.16394,43.25943007 -42.49003,0.94043 -2.12451,-33.385 -1.2747,82.28694 -23.36951,10.814859 -15.72132,9.87444 -7.2233,9.40422 -2.54941,9.87443 -19.545422,-4.70211 -26.34381,-8.4638 -41.64024,-13.16591 84.13027,27.74245 -0.4249,19.27867 L 3.7812876,152.16229 19.927508,180.84517 2.0816876,151.22186 56.468928,87.743371 2.9314876,151.22186 l 93.4780704,0.47022 4.249012,22.09992 12.74701,19.27865 2.54941,6.58296 -30.167932,33.38497 -30.59282,34.79561 18.69561,-20.21908 -22.09482,-16.92757 37.39124,32.91474 -16.99602,-15.98717 45.039432,-49.37213 12.74701,8.4638 14.44661,5.17233 -5.0988,91.22089 -24.64422,-18.33821 24.64422,19.74887 25.06913,-13.63614 -25.06913,12.22548 6.79841,-93.10175 19.12051,-2.35105 16.99602,-8.93401 3.8241,-5.17233 63.31015,63.94866 -22.09482,-21.62964 -14.4466,15.51692 29.74302,-28.68285 -16.14621,14.57654 -40.36554,-43.72963 8.07311,-16.45739 4.249,-15.04675 v -2.82126 l 93.47808,-1.41064 0.8498,5.17233 -14.02171,20.68928 13.59682,-25.3914 -47.22287,-75.185249 46.79796,75.185249 h -95.60258 l 1.6996,-18.80844 81.15597,-33.38499 -82.43067,32.91478 -10.19761,-16.92761 -13.5968,-15.51696 -13.59682,-6.11274 -8.49801,-5.172319 1.6996,-51.25301 z';

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
  const {className, width, circleWidth, phone, height, style} = props;
  const svgRef = React.useRef();

  const stickmanScale = width / 550;

  return (
    <div
      className={`${className} flex flex-col w-full h-full items-center relative`}
      style={{fontFamily: "'Cabin Sketch'", width}}>
      <h1 className="mb-4">Info</h1>
      <Description height="10rem" className="flex-grow ml-2 mr-4 mb-6">
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
      <svg
        className="mt-auto  w-full overflow-visible"
        style={{height: height / (phone ? 2.3 : 2)}}
        ref={svgRef}>
        <g transform={`translate(${width / 2},${20}) scale(${stickmanScale})`}>
          <SimplePath
            times={1000}
            interval={500}
            sketchOpts={sketchOpts}
            svgRef={svgRef}
            d={stickman}
            style={{transform: 'scale(1)'}}
          />
        </g>
        <g
          transform={`translate(${40 + -40 * stickmanScale},${height /
            19}) scale(${stickmanScale})`}>
          <SimplePath
            times={1000}
            interval={500}
            sketchOpts={{...sketchOpts, roughness: 2, bowing: 3, fill: 'none'}}
            svgRef={svgRef}
            d={crossPath}
            style={{transform: 'scale(1) rotate(0deg)'}}
          />
        </g>
      </svg>
    </div>
  );
}

export default MissionStatement;
