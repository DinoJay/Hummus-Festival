import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';

import {hot} from 'react-hot-loader';

import PropTypes from 'prop-types';

import * as rough from 'roughjs/dist/rough.umd';

import ReactRough, {Path, Arc, Rectangle, Line, Circle} from './ReactRough';
import NavRing from './NavRing';

const tinyGabArc = 0.000001;

const data = [
  {
    age: '<5',
    population: 2704659
  },
  {
    age: '5-13',
    population: 4499890
  },
  {
    age: '14-17',
    population: 2159981
  },
  {
    age: '18-24',
    population: 3853788
  },
  {
    age: '25-44',
    population: 14106543
  },
  {
    age: '45-64',
    population: 8819342
  },
  {
    age: '≥65',
    population: 612463
  },
];

function App() {
  const [size, setSize] = useState([100, 100]);

  const contRef = React.createRef();
  const maxWidth = 700;
  const maxHeight = 700;
  useEffect(() => {
    const width = contRef.current.scrollWidth;
    const height = contRef.current.scrollHeight;
    setSize([Math.min(width, maxWidth), Math.min(height, maxHeight)]);
  }, []);

  // console.log('size', size);

  return (
    <div
      ref={contRef}
      className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="border p-1">
        <NavRing
          width={size[0]}
          height={size[1]}
          className="flex justify-center"
        />
      </div>
    </div>
  );
}

export default hot(module)(App);
