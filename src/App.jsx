import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';

import {hot} from 'react-hot-loader';

import PropTypes from 'prop-types';

import * as rough from 'roughjs/dist/rough.umd';
import ReactRough, {Path, Arc, Rectangle, Line, Circle} from './ReactRough';

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
  const [width, height] = [960, 500];
  const [arcData, setArcData] = useState([]);

  const radius = Math.min(width, height) / 2;
  useEffect(() => {
    const pie = d3
      .pie()
      .sort(null)
      // .padAngle(100)
      .value(d => d.population);

    setArcData(pie(data));
  }[]);

  console.log('arcData', arcData);
  const arc = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 100);

  const labelArc = d3
    .arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  const arcs2 = arcData.map(a => (
    <Arc
      x={radius}
      y={radius}
      width={2 * radius}
      height={2 * radius}
      start={a.startAngle - Math.PI / 2}
      stop={a.endAngle - Math.PI / 2}
      closed
      options={{
        stroke: 'red',
        strokeWidth: 4,
        fill: 'rgba(255,255,0,0.4)',
        fillStyle: 'solid',
      }}
    />
  ));

  const arcs = arcData.map(a => (
    <Path
      points={arc(a)}
      translate={[radius, radius]}
      options={{
        stroke: 'red',
        strokeWidth: 4,
        fill: 'rgba(255,255,0,0.4)',
        fillStyle: 'solid',
      }}
    />
  ));
  return (
    <div>
      <h1>Hummus</h1>
      <ReactRough width={width} height={height}>
        {arcs}
        <Circle x={radius} y={radius} diameter={2 * radius} />
      </ReactRough>
    </div>
  );
}

export default hot(module)(App);
