import React, {useState, useMemo, useEffect} from 'react';

import chroma from 'chroma-js';

import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import {styler, tween, easing} from 'popmotion';
import posed, {PoseGroup} from 'react-pose';
import Description from '../components/utils/Description';

import data from './peopleData';

import {SimplePath, Svg} from '../ArcPath';

const PosedDiv = posed.div();

const verticalText = {
  transform: 'translate(-25%,0%) rotate(90deg)',
  // transformOrigin: 'left top 0',
};

// const sketchOpts = {
//   bowing: 20,
//   roughness: 0.9,
//   strokeWidth: 4,
//   fillWeight: 10,
//   fill: chroma('#01a9d0').alpha(0.2),
//   stroke: BLACK,
//   fillStyle: 'zigzag',
// };

const text =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';

export default function People(props) {
  const {className, width, circleWidth, phone, height, style} = props;

  const stickmanScale = width / 550;
  const logoScale = width / 400;
  const [artist, setArtist] = useState(null);

  console.log('artist', data);

  return (
    <div
      className={`${className} flex flex-col w-full h-full items-center relative`}
      style={{fontFamily: "'Cabin Sketch'", width}}>
      <h1 className="mb-4 text-center">People</h1>
      <div
        className={`flex-grow flex flex-wrap w-full justify-center ${
          artist ? 'overflow-hidden' : 'overflow-y-auto'
        }`}
        style={
          {
            // flexFlow: 'column wrap'
          }
        }>
        <PoseGroup>
          {!artist &&
            data.map(d => (
              <PosedDiv
                onClick={() => {
                  artist ? setArtist(null) : setArtist(d);
                }}
                key={d.name}
                className="cursor-pointer h-24 sm:w-24 lg:h-40 lg:w-1/4 lg:m-2 flex items-end m-1 border-2 border-black border-solid border-yo"
                style={{
                  transform: 'rotate(6deg)',
                  backgroundImage: `url(${d.src})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}>
                <div className="m-1 text-white font-bold lg:text-2xl">
                  {d.name}
                </div>
              </PosedDiv>
            ))}
          {artist && (
            <PosedDiv
              key={artist.name}
              onClick={() => setArtist(null)}
              className="w-full h-full flex flex-col"
              style={{
                transform: 'rotate(6deg)',
              }}>
              <div className="flex-grow flex flex-col p-4 border-2 border-black border-solid border-yo">
                <div
                  className="w-auto border-yo"
                  style={{
                    height: height / 2.7,
                    backgroundImage: `url(${artist.src})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="px-6 py-4 flex-grow">
                  <div className="font-bold text-xl mb-2">{artist.name}</div>
                  <p className="md:text-lg overflow-y-auto">{artist.text}</p>
                </div>
              </div>
            </PosedDiv>
          )}
        </PoseGroup>
      </div>
    </div>
  );
}
