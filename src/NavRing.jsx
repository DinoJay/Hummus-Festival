import React, {useState, useMemo, useEffect} from 'react';
import * as d3 from 'd3';
import chroma from 'chroma-js';

import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
// import posed from 'react-pose';
import {styler, tween, easing} from 'popmotion';
import {ArcPath} from './ArcPath';

import colors from './colors';

const BLACK = '#404040';

const Description = props => {
  const {style, text, preview} = props;
  const [ext, setExt] = useState(false);

  return (
    <div
      className="absolute rounded-full bg-white border-2 border-black flex flex-col items-center justify-center p-2"
      onClick={() => setExt(!ext)}
      style={{
        height: ext ? '100%' : '15%',
        width: ext ? '100%' : '15%',
        transition: 'width 300ms, height 300ms',
        transform: 'translate(-50%,-50%)',
        ...style
      }}>
      {ext ? (
        text
      ) : (
        <div className="m-4 text-4xl " style={{fontFamily: '"Cabin Sketch"'}}>
          {preview}
        </div>
      )}
    </div>
  );
};
const setColor = hex =>
  chroma(hex)
    .saturate(2)
    .brighten(2)
    .alpha(0.2)
    .css();

const initData = [
  {
    index: 0,
    outerLabel: 'caos',
    connector: '↗',
    innerLabel: "l'io",
    // fill: '#E42149',
    fill: colors.red[3],
    color: colors.red[5],
    size: 5 / 16
  },
  {
    index: 1,
    outerLabel: 'scelta',
    connector: '↜',
    innerLabel: 'azione',
    fill: colors.orange[3],
    color: colors.orange[5],
    size: 3 / 16
  },
  {
    index: 2,
    outerLabel: 'Attezioen',
    innerLabel: 'La Forma',
    connector: '◗',
    // fill: '#FFF146',
    fill: colors.yellow[3],
    color: colors.yellow[5],
    size: 3 / 16
  },
  {
    index: 3,
    outerLabel: 'Repulsion',
    innerLabel: 'La Forma',
    fill: colors.lime[3],
    color: colors.lime[5],
    size: 3 / 16
  },
  {
    index: 4,
    outerLabel: 'dialobo',
    connector: '↯',
    innerLabel: "l'altro",
    fill: colors.cyan[3],
    color: colors.cyan[5],
    size: 3 / 16
  },
  {
    index: 5,
    outerLabel: 'Reflessione',
    innerLabel: "Il'se",
    connector: '↹',
    fill: colors.fuschia[3],
    color: colors.fuschia[5],
    size: 3 / 16
  },
  {
    index: 6,
    outerLabel: 'transformation',
    connector: '⇝',
    innerLabel: "Il'se",
    fill: colors.indigo[3],
    color: colors.indigo[5],
    size: 3 / 16
  },
  {
    index: 7,
    outerLabel: 'integrazione',
    connector: '▣',
    innerLabel: 'Il Tutto',
    fill: '#0091E5',
    color: colors.blue[5],
    size: 5 / 16
  },
];

const watercolor = initData.map(d => (
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
        values="1 0 0 0 -1
                                       1 0 0 0 1
                                       4 0 0 0 1
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
    <feComposite operator="in" in="Texture_30" in2="FILL_20" result="FILL_40" />
    <feComposite operator="in" in="COLOR-blu" in2="FILL_40" result="FILL_50" />
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

const labels = uniqBy(initData, d => d.innerLabel);

const pie = d3
  .pie()
  .sort((a, b) => a.index - b.index)
  // .sort(null)
  // .padAngle(100)
  .value(d => d.size);

const initPieData = cloneDeep(pie(initData));

const Btn = ({className, label, active, onClick, color}) => (
  <div
    className={`${className} cursor-pointer rounded-full p-1 px-2`}
    style={{
      color: !active ? color : 'white',
      background: active && color
    }}
    onClick={onClick}>
    {label}
  </div>
);

function NavRing(props) {
  const {className, width, circleWidth, height, style} = props;
  // const [data, setData] = useState([...initData]);

  const [id, setId] = useState(null);
  const data = initData;
  const radius = (circleWidth * 2) / 3;

  console.log('radius', radius);

  // circleWidth / 2;
  // useEffect(() => {
  //
  //   setPieData();
  // }, []);
  const MIN_ANGLE = 0.0385;
  const fData = data.map(d => {
    if (id === null) return d;
    if (d.innerLabel === id) return {...d, size: 10};
    return {...d, size: MIN_ANGLE};
  });

  const pData = pie(fData);
  const pieData = sortBy(pData, a => -a.startAngle);

  const svgRef = React.createRef();

  // const initArc = d3
  //   .arc()
  //   // TODO: padding
  //   .outerRadius(radius)
  //   .innerRadius(radius)
  //   .startAngle(Math.PI);
  // .startAngle(Math.PI/2)
  // .endAngle(Math.PI );

  const outerArc = d3
    .arc()
    // .startAngle(Math.PI)
    // .endAngle(2 * Math.PI)
    // TODO: padding
    .outerRadius(radius - 30)
    .innerRadius(radius / 1.7);

  const innerArc = d3
    .arc()
    // .padAngle(0.1)
    // .startAngle(0)
    // .startAngle(0)
    // .endAngle(Math.PI * 2)
    // .endAngle(Math.PI / 2)
    // TODO: padding
    .outerRadius(radius / 1.7)
    .innerRadius(0);

  const labelArc = d3
    .arc()
    .innerRadius(radius - 30)
    .outerRadius(radius - 40);

  // const defaultD = initArc({
  //   startAngle: Math.PI / 2,
  //   endAngle: Math.PI,
  //   value: 100,
  // });

  // const fillStyle zigzag 'dots';

  const strokeOpts = {
    bowing: 2,
    roughness: 2,
    // sketch: 1.8,
    strokeWidth: 1,
    fillWeight: 10,
    fill: 'none',
    // stroke: 'none'

    // fillStyle: 'hachure',
    // hachureGap: 3,
    // fillWidth: 200,
    // sketch: 30.8,
    // bowing: 10,
  };
  const sketchOpts = {
    bowing: 20,
    roughness: 0.9,
    strokeWidth: 12,
    fillWeight: 28,
    // fill: chroma(LIGHTBLUE).alpha(0.14),
    stroke: 'none',
    fillStyle: 'zigzag',
  };

  const outsideArcs = (opts, stroke = false) =>
    pieData.map((a, i) => (
      <ArcPath
        className="watercolor-effect"
        svgRef={svgRef}
        data={a}
        pathFn={d =>
          outerArc({
            ...d,
            startAngle: d.startAngle,
            endAngle: d.endAngle
          })
        }
        defaultData={pieData.find(d => a.data.outerLabel === d.data.outerLabel)}
        key={a.data.outerLabel}
        style={{
          mixBlendMode: 'multiply',
          opacity: 0.5,
          filter: `url(#gooey)`
          // filter: `url(#dilate)`
          // transform: `translate(${radius}, ${radius})`,
          // fill: 'none'
        }}
        options={{
          // stroke: 'red',
          // strokeWidth: 4,
          // bowing: 3,
          // stroke: BLACK,
          fill: a.data.fill,
          ...opts
          // fillStyle: 'zigzag',
        }}
      />
    ));

  const labelArcs = pieData.map((a, i) => (
    <ArcPath
      svgRef={svgRef}
      data={a}
      pathFn={labelArc}
      defaultData={initPieData.find(
        d => a.data.outerLabel === d.data.outerLabel,
      )}
      stroke="white"
      id={`outerArc+${a.data.outerLabel}`}
      style={{stroke: 'white', fill: 'none'}}
    />
  ));

  const insideArcs = (opts, filter = null) =>
    pieData.map(a => (
      <ArcPath
        svgRef={svgRef}
        data={a}
        pathFn={d =>
          innerArc({
            ...d,

            startAngle: d.startAngle,
            endAngle: d.endAngle + 0.05
          })
        }
        key={a.data.outerLabel}
        defaultData={initPieData.find(
          d => a.data.outerLabel === d.data.outerLabel,
        )}
        options={{
          // stroke: 'red',
          fillWidth: 10,
          sketch: 30.8,
          bowing: 5,
          // stroke: BLACK,
          fill: a.data.fill,
          ...opts,
          // fillStyle: 'zigzag',
        }}
        style={{
          mixBlendMode: 'multiply',
          opacity: 0.7,
          // filter: `url(#dilate)`
          filter
          // transform: `translate(${radius}, ${radius})`,
          // stroke: 'black',
          // fill: data.fill
        }}
      />
    ));

  const strokeInsideArcs = () =>
    pieData.map((a, i) => (
      <ArcPath
        svgRef={svgRef}
        data={a}
        pathFn={d =>
          innerArc({
            ...d,

            startAngle: d.startAngle,
            endAngle: d.startAngle + 0.05
          })
        }
        key={a.data.outerLabel}
        defaultData={initPieData.find(
          d => a.data.outerLabel === d.data.outerLabel,
        )}
        options={{
          // stroke: 'red',
          fillWidth: 10,
          sketch: 30.8,
          bowing: 5,
          // stroke: BLACK,
          fill: a.data.fill,
          ...strokeOpts,
          strokeWidth:
            i === 7 || i === 6 || i === 4 || i === 2 || i === 0 ? 5 : 0
          // ...opts,
          // fillStyle: 'zigzag',
        }}
        style={{
          mixBlendMode: 'multiply',
          opacity: 0.7,
          // filter: `url(#dilate)`
          // filter
          // transform: `translate(${radius}, ${radius})`,
          // stroke: 'black',
          // fill: data.fill
        }}
      />
    ));

  return (
    <div
      style={{fontFamily: "'Cabin Sketch'"}}
      className={`${className} flex flex-col items-center justify-center`}
      style={{width}}>
      <div onClick={() => setId(null)}>all</div>

      <div className="m-4 text-3xl text-center">
        {labels.slice(0, labels.length / 2).map(d => (
          <div className="flex justify-center items-center">
            <Btn
              className="m-1 mx-2"
              color={d.color}
              label={d.outerLabel}
              active={d.innerLabel === id}
              onClick={() => setId(d.innerLabel)}
            />
            <div style={{color: d.color}}>{d.connector}</div>
            <Btn
              className="m-1 mx-2"
              color={d.color}
              label={d.innerLabel}
              active={d.innerLabel === id}
              onClick={() => setId(d.innerLabel)}
            />
          </div>
        ))}
      </div>
      <div className="relative flex-grow">
        <Description
          preview="!!!"
          text="this is fire the strongest element on our earth,
          this is fire the strongest element on our earth,
this is fire the strongest element on our earth
pthis is fire the strongest element on our earth,
this is fire the strongest element on our earth,
this is fire the strongest element on our earth
          "
          style={{
            left: radius,
            top: radius,
          }}
        />
        <svg ref={svgRef} width={radius * 2} height={radius * 2}>
          <g
            id="labelArcs"
            style={{transform: `translate(${radius}px, ${radius}px)`}}>
            {labelArcs}
          </g>

          <g style={{transform: `translate(${radius}px, ${radius}px)`}}>
            {outsideArcs(sketchOpts, true)}
            {outsideArcs(strokeOpts, false)}
          </g>
          <g style={{transform: `translate(${radius}px, ${radius}px)`}}>
            {insideArcs(sketchOpts, 'url(#gooey)')}
            {strokeInsideArcs()}
          </g>
          <g
            id="labels"
            style={{
              transform: `translate(${radius}px,${radius}px)`,
            }}>
            {data.map(d => (
              <text style={{fontSize: 23, color: d.color}}>
                <textPath fill={d.color} xlinkHref={`#outerArc${d.outerLabel}`}>
                  {d.outerLabel}
                </textPath>
              </text>
            ))}
          </g>
          <defs>
            {watercolor}

            <filter id="gooey">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="7"
                colorInterpolationFilters="sRGB"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 9 -2"
                result="gooey"
              />
            </filter>
            <filter id="dilate">
              <feMorphology operator="dilate" radius="3" />
            </filter>
            <filter id="blur" x="0" y="0">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="m-4 text-3xl flex flex-col items-center text-center">
        {labels.slice(labels.length / 2).map(d => (
          <div className="flex items-center">
            <Btn
              className="m-1 mx-2"
              label={d.outerLabel}
              color={d.color}
              active={d.innerLabel === id}
              onClick={() => setId(d.innerLabel)}
            />
            <div className="" style={{color: d.color}}>
              {d.connector}
            </div>
            <Btn
              className="m-1 mx-2"
              color={d.color}
              label={d.innerLabel}
              active={d.innerLabel === id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavRing;
