import React, {useState, useMemo, useEffect} from 'react';

import chroma from 'chroma-js';

import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import {styler, tween, easing} from 'popmotion';
import posed, {PoseGroup} from 'react-pose';
import Description from '../Description';

import data from './peopleData';

import {SimplePath, Svg} from '../ArcPath';

const PosedDiv = posed.div();

const verticalText = {
  transform: 'translate(-25%,0%) rotate(90deg)',
  // transformOrigin: 'left top 0',
};

export default function People(props) {
  const {className, width, circleWidth, phone, height, style} = props;

  const stickmanScale = width / 550;
  const logoScale = width / 400;
  const [artist, setArtist] = useState(null);

  return (
    <div
      className={`${className} relative overflow-hidden`}
      style={{fontFamily: "'Cabin Sketch'", width, minHeight: height}}>
      <h1 className="mb-4 text-center">People</h1>
      <div
        className={`flex-grow flex flex-wrap w-full justify-center ${
          artist ? 'overflow-hidden' : 'overflow-hidden'
        }`}
        style={
          {

            // flexFlow: 'column wrap'
          }
        }>
        <PoseGroup>
          {data
            .filter(d => !artist || artist.name !== d.name)
            .map(d => (
              <PosedDiv
                onClick={() => {
                  artist ? setArtist(null) : setArtist(d);
                }}
                key={d.name}
                className="cursor-pointer h-24 w-24 sm:w-32 sm:h-32 flex items-end m-1 border-2 border-black border-solid border-yo"
                style={{
                  transform: 'rotate(6deg)',
                  backgroundImage: `url(${d.src})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}>
                <div className="m-1 text-white font-bold md:text-2xl">
                  {d.name}
                </div>
              </PosedDiv>
            ))}
          {artist && (
            <PosedDiv
              key={artist.name}
              onClick={() => setArtist(null)}
              className="fixed mt-8 md:mt-16 z-20 top-0 w-full h-full overflow-y-auto"
              style={{
                width,
                // left: width / 2
                // transform: 'rotate(6deg)',
              }}>
              <div className="p-4 border-2 bg-white border-black border-solid border-yo">
                <div
                  className="w-auto border-yo border-solid border-black"
                  style={{
                    height: height / 2.7,
                    backgroundImage: `url(${artist.src})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="px-6 py-4 overflow-y-auto">
                  <div className="font-bold text-xl mb-2">{artist.name}</div>
                  <p className="flex-grow md:text-2xl max-h-48 md:max-h-64 overflow-y-auto">
                    {artist.text}
                  </p>
                </div>
              </div>
            </PosedDiv>
          )}
        </PoseGroup>
      </div>
    </div>
  );
}
