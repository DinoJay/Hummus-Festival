import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import chroma from 'chroma-js';

import PropTypes from 'prop-types';

import ReactRough, {Path, Arc, Rectangle, Line, Circle} from './ReactRough';

const tinyGabArc = 0.000001;

const setColor = hex =>
  chroma(hex)
    .saturate(0)
    .brighten(1);
// .alpha(0.9);

const data = [
  {
    outerLabel: 'caos',
    innerLabel: "l'io",
    fill: setColor('tomato'),
    size: 5 / 16,
  },
  {
    outerLabel: 'scelta',
    innerLabel: 'azione',
    fill: setColor('orange'),
    size: 3 / 16,
  },
  {
    outerLabel: 'Attezioen',
    innerLabel: 'La Forma',
    fill: setColor('gold'),
    size: 4 / 16,
  },
  {
    outerLabel: 'Repulsion',
    innerLabel: "l'altro",
    fill: setColor('lightgreen'),
    size: 3 / 16,
  },
  {
    outerLabel: 'dialobo',
    innerLabel: "l'altro",
    fill: setColor('#0D98BA'),
    size: 3 / 16,
  },
  {
    outerLabel: 'Reflessione',
    innerLabel: "Il'se",
    age: '45-64',
    fill: setColor('purple'),
    size: 4 / 16,
  },
  {
    outerLabel: 'transformation',
    innerLabel: null,
    fill: 'violet',
    size: 3 / 16,
  },
  {
    outerLabel: 'integrazione',
    innerLabel: 'Il Tutto',
    fill: setColor('lightblue'),
    size: 5 / 16,
  }
];

function NavRing(props) {
  const {className, width, height, style} = props;
  const [arcData, setArcData] = useState([]);

  const radius = Math.min(width, height) / 2;
  useEffect(() => {
    const pie = d3
      .pie()
      .sort(null)
      // .padAngle(100)
      .value(d => d.size);

    setArcData(pie(data));
  }, []);

  console.log('arcData', arcData);
  const outerArc = d3
    .arc()
    // TODO: padding
    .outerRadius(radius - 10)
    .innerRadius(radius / 1.5);

  const innerArc = d3
    .arc()
    // TODO: padding
    .outerRadius(radius / 1.5)
    .innerRadius(0);

  const labelArc = d3
    .arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  const arcs0 = arcData.map(a => (
    <Path
      points={outerArc(a)}
      translate={[radius, radius]}
      options={{
        // stroke: 'red',
        // strokeWidth: 4,
        // bowing: 3,
        // sketch: 5.8,
        // hachureAngle: 10, // angle of hachure,
        // hachureGap: 20,
        // fill: 'rgba(255,255,0,0.4)',
        fillStyle: 'solid'
      }}
    />
  ));
  const arcs1 = arcData.map(({data, ...a}) => (
    <Path
      points={innerArc(a)}
      translate={[radius, radius]}
      filter={`url(#${data.fill})`}
      options={{
        stroke: 'black',
        // strokeWidth: 3,
        bowing: 2,
        sketch: 15.8,
        // hachureAngle: 60, // angle of hachure,
        // hachureGap: 3,
        fill: data.fill,
        fillStyle: 'solid'
      }}
    />
  ));
  const watercolor = data.map(d => (
    <>
      <filter
        id={d.fill}
        colorInterpolationFilters="sRGB"
        x="0%"
        y="0%"
        height="100%"
        width="100%"
        transform="40deg">
        <feTurbulence
          type="fractalNoise"
          result="cloudbase"
          baseFrequency=".0035"
          numOctaves="5"
          seed="15"
        />
        <feColorMatrix
          in="cloudbase"
          type="hueRotate"
          values="0"
          result="cloud"
        />
        <feColorMatrix
          in="cloud"
          result="wispy"
          type="matrix"
          values="4 0 0 0 -1
                                       4 0 0 0 -1
                                       4 0 0 0 -1
                                       1 0 0 0 0
                                       "
        />

        <feFlood floodColor={d.fill} result="green" />
        <feBlend mode="screen" in2="green" in="wispy" />
        <feGaussianBlur stdDeviation="4" />
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
    </>
  ));

  const morph = (
    <filter id="filter">
      <feFlood floodColor="#73DCFF" floodOpacity="0.75" result="COLOR-blu" />
      <feFlood floodColor="#9673FF" floodOpacity="0.4" result="COLOR-red" />
      <feTurbulence
        baseFrequency=".05"
        type="fractalNoise"
        numOctaves="3"
        seed="0"
        result="Texture_10"
      />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0,
          0 0 0 0 0,
          0 0 0 0 0,
          0 0 0 -2.1 1.1"
        in="Texture_10"
        result="Texture_20"
      />
      <feColorMatrix
        result="Texture_30"
        type="matrix"
        values="0 0 0 0 0,
          0 0 0 0 0,
          0 0 0 0 0,
          0 0 0 -1.7 1.8"
        in="Texture_10"
      />
      <feOffset dx="-3" dy="4" in="SourceAlpha" result="FILL_10" />
      <feDisplacementMap
        scale="17"
        in="FILL_10"
        in2="Texture_10"
        result="FILL_20"
      />
      <feComposite
        operator="in"
        in="Texture_30"
        in2="FILL_20"
        result="FILL_40"
      />
      <feComposite
        operator="in"
        in="COLOR-blu"
        in2="FILL_40"
        result="FILL_50"
      />
      <feMorphology
        operator="dilate"
        radius="3"
        in="SourceAlpha"
        result="OUTLINE_10"
      />
      <feComposite
        operator="out"
        in="OUTLINE_10"
        in2="SourceAlpha"
        result="OUTLINE_20"
      />
      <feDisplacementMap
        scale="7"
        in="OUTLINE_20"
        in2="Texture_10"
        result="OUTLINE_30"
      />
      <feComposite
        operator="arithmetic"
        k2="-1"
        k3="1"
        in="Texture_20"
        in2="OUTLINE_30"
        result="OUTLINE_40"
      />
      <feConvolveMatrix
        order="8,8"
        divisor="1"
        kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 "
        in="SourceAlpha"
        result="BEVEL_10"
      />

      <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
      <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
        result="goo"
      />
      <feBlend in="SourceGraphic" in2="goo" result="gooX" />

      <feMerge result="merge2">
        <feMergeNode in="OUTLINE_40" />
      </feMerge>
    </filter>
  );

  return (
    <div className={className} style={style}>
      <ReactRough
        width={width}
        height={height}
        prepend={
          <defs>
            <filter id="f1" x="0" y="0">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            </filter>
            {morph}
            {watercolor}
            <filter id="turb">
              <feTurbulence
                baseFrequency=".01"
                type="fractalNoise"
                numOctaves="3"
              />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="50"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -4"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" result="goo" />
            </filter>
          </defs>
        }>
        {arcs0}
        {arcs1}
        <Circle
          translate={[0, 0]}
          x={radius}
          y={radius}
          diameter={2 * radius}
        />
      </ReactRough>
    </div>
  );
}

export default NavRing;
