import React from 'react';
import {Svg, SimplePath} from './ArcPath';

export const FIRE = 'FIRE';
export const WATER = 'WATER';
export const EARTH = 'EARTH';
export const AIR = 'AIR';
const firepath =
  'M 16.5197,0.59233713 0.7681575,36.945024 37.784299,35.056574 Z';
export const icons = {
  [FIRE]: {
    path: firepath,
    transform: 'translate(10px, 8px)',
    svg: (
      <Svg width="50" height="50">
        <SimplePath d={firepath} />
      </Svg>
    )
  },
  [WATER]: {
    path:
      'M 1.6354397,4.2587056 19.350877,37.691604 37.066314,1.0362583 c 0,0 -41.6552162,2.0140299 -35.4308743,3.2224473 z',
    transform: 'translate(10px, 20px)'
  },
  [EARTH]: {
    path:
      'M 0,0 16.630952,38.086308 31.372024,2.1785711 21.544642,25.613095 29.482142,23.723214 2.2678571,26.369047 21.922618,23.723214 30.238094,2.1785711 Z',
    transform: 'translate(10px, 8px)'
  },
  [AIR]: {
    path:
      'M 19.276784,1.0446427 1.889881,33.172618 38.553572,31.282736 26.458332,10.494047 3.401784,10.872023 36.285714,9.7380953 H 24.568451 Z',
    transform: 'translate(10px, 8px)'
  }
};
