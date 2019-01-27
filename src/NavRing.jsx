import React, {useState, useMemo, useEffect} from 'react';
import * as d3 from 'd3';
import chroma from 'chroma-js';

import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

// import posed from 'react-pose';
import {styler, tween, easing} from 'popmotion';

import {interpolate} from 'flubber';

// import ReactRough, {Path, Arc, Rectangle, Line, Circle} from './ReactRough';
//
//           <ReactRough
//             width={width}
//             height={height}
//             prepend={null}
//             append={null}>
//             <Circle
//               translate={[0, 0]}
//               x={radius}
//               y={radius}
//               diameter={2 * radius}
//             />
//             {roughArcs}
//           </ReactRough>

// const Icon = posed.path({}
//   pathIds.reduce((config, id) => {
//     config[id] = {
//       d: paths[id],
//       transition: morphTransition
//     };
//
//     return config;
//   }, {})
// );

function memo(value) {
  const getMemoized = useMemo(() => {
    let memoized;
    let tmp = value;
    return current => {
      if (!isEqual(current, memoized)) {
        tmp = cloneDeep(memoized);
        memoized = current;
      }
      return tmp;
    };
  }, []);
  return getMemoized(value);
}

const MemPath = ({d, defaultD, ...props}) => {
  const oldD = memo(d);
  const ref = React.createRef();

  // if (oldD !== d)

  console.log('oldDef', defaultD);

  useEffect(
    () => {
      // setTimeout(() => {
      // console.log('d', d);
      // console.log('defaultD', defaultD);
      if (ref.current) {
        const arg = oldD ? [oldD, d] : [defaultD, d];
        const shape = styler(ref.current);
        tween({
          from: 0,
          to: 1,
          duration: 500,
          ease: easing.linear,
          // flip: Infinity,
        })
          .pipe(interpolate(...arg))
          .start(shape.set('d'));
      }
      // }, 400);
    },
    [d],
  );

  return <path ref={ref} {...props} />;
};

const setColor = hex =>
  chroma(hex)
    .saturate(2)
    .brighten(2)
    .alpha(0.7)
    .css();

const initData = [
  {
    outerLabel: 'caos',
    innerLabel: "l'io",
    fill: 'palevioletred',
    color: 'tomato',
    size: 5 / 16,
  },
  {
    outerLabel: 'scelta',
    innerLabel: 'azione',
    fill: setColor('orange'),
    color: 'orange',
    size: 3 / 16,
  },
  {
    outerLabel: 'Attezioen',
    innerLabel: 'La Forma',
    fill: setColor('gold'),
    color: 'gold',
    size: 4 / 16,
  },
  {
    outerLabel: 'Repulsion',
    innerLabel: 'La Forma',
    fill: setColor('lightgreen'),
    color: 'lightgreen',
    size: 3 / 16,
  },
  {
    outerLabel: 'dialobo',
    innerLabel: "l'altro",
    fill: setColor('#0D98BA'),
    color: '#0D98BA',
    size: 3 / 16,
  },
  {
    outerLabel: 'Reflessione',
    innerLabel: "Il'se",
    // fill: 'palevioletred',
    fill: setColor('tomato'),
    color: 'purple',
    size: 4 / 16,
  },
  {
    outerLabel: 'transformation',
    innerLabel: "Il'se",
    fill: 'violet',
    color: 'violet',
    size: 3 / 16,
  },
  {
    outerLabel: 'integrazione',
    innerLabel: 'Il Tutto',
    fill: setColor('lightblue'),
    color: 'lightblue',
    size: 5 / 16,
  }
];

const labels = uniqBy(initData, d => d.innerLabel);

const pie = d3
  .pie()
  .sort(null)
  // .padAngle(100)
  .value(d => d.size);

const initPieData = cloneDeep(pie(initData));

const Btn = ({className, active, onClick, d}) => (
  <div
    className={`${className} cursor-pointer rounded-full p-1 px-2`}
    style={{
      color: !active ? d.color : 'white',
      background: active && d.color,
    }}
    onClick={onClick}>
    {d.innerLabel}
  </div>
);

function NavRing(props) {
  const {className, width, height, style} = props;
  // const [data, setData] = useState([...initData]);

  const [id, setId] = useState(null);
  const data = initData;
  const radius = Math.min(width, height) / 2 - 40;
  // useEffect(() => {
  //
  //   setPieData();
  // }, []);
  const tmpData = pie(
    id !== null
      ? data.map(d => ({...d, size: d.innerLabel !== id ? 0 : d.size}))
      : data,
  );
  const sumId = tmpData.reduce(
    (acc, d) => (d.innerLabel === id ? acc + 1 : acc),
    0,
  );
  console.log('sumId', sumId);

  const pieData = tmpData.map(
    d =>
      // if (id !== null && d.data.innerLabel !== id) {
      //   return {...d, endAngle: d.startAngle};
      // }
      // if (d.data.innerLabel === id) {
      //   return {...d, endAngle: (2 * Math.PI) 1 + d.startAngle};
      // }
      d,
  );

  // console.log('pieData', pieData);

  const initArc = d3
    .arc()
    // TODO: padding
    .outerRadius(radius)
    .innerRadius(radius - 10);
  // .startAngle(Math.PI/2)
  // .endAngle(Math.PI );

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
    .innerRadius(radius - 30)
    .outerRadius(radius - 40);

  const defaultD = initArc({
    startAngle: Math.PI / 2,
    endAngle: Math.PI,
    value: 100,
  });

  console.log('initPieData', initPieData);
  // initPieData.find(d => a.data.id === d.data.id)
  const arcs0 = pieData.map((a, i) => (
    <MemPath
      d={outerArc(a)}
      defaultD={initArc(
        initPieData.find(d => a.data.outerLabel === d.data.outerLabel),
      )}
      key={a.data.outerLabel}
      style={{
        // transform: `translate(${radius}, ${radius})`,
        stroke: 'black',
        fill: 'none'
      }}
      options={
        {
          // stroke: 'red',
          // strokeWidth: 4,
          // bowing: 3,
          // sketch: 5.8,
          // hachureAngle: 10, // angle of hachure,
          // hachureGap: 20,
          // fill: 'rgba(255,255,0,0.4)',
          // fillStyle: 'solid'
        }
      }
    />
  ));

  const labelArcs = pieData.map((a, i) => (
    <MemPath
      defaultD={initArc(
        initPieData.find(d => a.data.outerLabel === d.data.outerLabel),
      )}
      stroke="white"
      id={`outerArc${i}`}
      style={{stroke: 'white', fill: 'none'}}
      d={labelArc(a)}
    />
  ));

  const arcs1 = pieData.map((a, i) => (
    <MemPath
      d={innerArc(a)}
      key={a.data.outerLabel}
      defaultD={initArc(
        initPieData.find(d => a.data.outerLabel === d.data.outerLabel),
      )}
      filter={`url(#${a.data.color})`}
      style={
        {
          // transform: `translate(${radius}, ${radius})`,
          // stroke: 'black',
          // fill: data.fill
        }
      }
    />
  ));

  // const strokeArcs1 = pieData.map(({data, ...a}, i) => (
  //   <path
  //     d={innerArc(a)}
  //     style={{
  //       // transform: `translate(${radius}, ${radius})`,
  //       stroke: 'black',
  //       fill: 'none'
  //     }}
  //   />
  // ));

  // const roughArcs = pieData.map(({data, ...a}, i) => (
  //   <Path
  //     d={innerArc(a)}
  //     translate={[radius, radius]}
  //     options={{
  //       stroke: 'black',
  //       strokeWidth: 1,
  //       bowing: 2,
  //       sketch: 15.8,
  //       // hachureAngle: 60, // angle of hachure,
  //       // hachureGap: 3,
  //       // fill: data.fill,
  //       fillStyle: 'solid',
  //       hachureAngle: 60, // angle of hachure,
  //       hachureGap: 299,
  //     }}
  //   />
  // ));
  const watercolor = initData.map(d => (
    <>
      <filter
        id={d.color}
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

  const polyLines = pieData.map(d => {
    const innerPoint = outerArc.centroid(d);
    const outerPoint = labelArc.centroid(d);
    const x =
      outerArc.centroid(d)[0] + width / 2 > width / 2 ? width / 2 : -width / 2;

    const pData = [innerPoint, [x, outerPoint[1]]];
    console.log('pData', pData);
    const line = d3.line()(pData);
    return <path d={line} stroke="black" />;
  });

  const texts = pieData.map((d, i) => {
    const innerPoint = innerArc.centroid(d);
    const outerPoint = labelArc.centroid(d);
    const x =
      outerArc.centroid(d)[0] + width / 2 > width / 2 ? width / 2 : -width / 2;

    const pData = [innerPoint, [x, outerPoint[1]]];
    console.log('pData', pData);
    // const line = d3.line()(pData);

    return (
      <text transform={`translate(${innerPoint})`} style={{fontSize: 19}}>
        {d.data.innerLabel}
      </text>
    );
  });

  // console.log('polyLines', polyLines);

  return (
    <div
      className={`${className} flex flex-col items-center justify-center`}
      style={style}>
      <div className="m-4 text-3xl text-center">
        <h1 className="cursor-pointer" onClick={() => setId(null)}>
          Hummus
        </h1>
        {labels.slice(0, labels.length / 2).map(d => (
          <Btn
            className="m-1 mx-2"
            d={d}
            active={d.innerLabel === id}
            onClick={() => setId(d.innerLabel)}
          />
        ))}
      </div>
      <div className="flex-grow">
        <svg width={radius * 2} height={radius * 2}>
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
                stdDeviation="20"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -4"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" result="goo" />
            </filter>
          </defs>

          <g
            filter="url(#goo)"
            style={{transform: `translate(${radius}px, ${radius}px)`}}>
            {arcs1}
          </g>
          <g style={{transform: `translate(${radius}px, ${radius}px)`}}>
            {arcs0}
          </g>
          <g
            style={{
              transform: `translate(${radius}px,${radius}px)`,
            }}>
            {labelArcs}
            {data.map((d, i) => (
              <text style={{fontSize: 23, color: d.color}}>
                <textPath fill={d.color} xlinkHref={`#outerArc${i}`}>
                  {d.outerLabel}
                </textPath>
              </text>
            ))}
          </g>
        </svg>
      </div>
      <div className="m-4 text-3xl text-center">
        {labels.slice(labels.length / 2).map(d => (
          <Btn
            className="m-1 mx-2"
            d={d}
            active={d.innerLabel === id}
            onClick={() => setId(d.innerLabel)}
          />
        ))}
      </div>
    </div>
  );
}

export default NavRing;
