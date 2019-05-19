import React, {useState, useMemo, useEffect} from 'react';
import * as d3 from 'd3';
import chroma from 'chroma-js';

import uniqBy from 'lodash/uniqBy';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
// import posed from 'react-pose';
import {styler, tween, easing} from 'popmotion';
import {SketchyArcPath, SimpleArcPath, Svg} from '../ArcPath';
import Description from '../components/utils/Description';

import defaultData from './circleData';

const loremIpsum =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';

const strokeWidth = i =>
  i === 7 || i === 6 || i === 4 || i === 2 || i === 0 ? 5 : 0;

const BLACK = '#404040';

const FIRE = defaultData[0];
const EARTH = defaultData[1];
const AIR = defaultData[2];
const WATER = defaultData[3];

const CenterTxt = props => {
  const {style, text, height, preview, className} = props;

  return (
    <div
      className={`bg-white border-2 border-black flex flex-col items-center justify-center px-4 py-1 ${className}`}
      style={{
        ...style,
        transform: `translate(-50%,50%)`,
      }}>
      <div
        className="text-4xl flex items-center"
        style={{fontFamily: '"Cabin Sketch"', transitionDelay: '400ms'}}>
        {preview}
      </div>
    </div>
  );
};

const setColor = hex =>
  chroma(hex)
    .saturate(2)
    .brighten(2)
    .alpha(0.2)
    .css();

const initData = defaultData.reduce((acc, d) => [...d.values, ...acc], []);

// console.log('defaultData', defaultData);

const pie = d3
  .pie()
  .sort((a, b) => a.index - b.index)
  // .sort(null)
  // .padAngle(100)
  .value(d => d.size);
const initPieData = cloneDeep(pie(initData));

const SourceElement = ({
  className,
  title,
  active,
  style,
  onClick,
  icon,
  color,
  phone
}) => (
  <div
    className={`${className} cursor-pointer p-1 px-2
      flex items-center border-yo
      `}
    style={{
      color: !active ? color : 'white',
      fontSize: phone ? '10vw' : '3rem',

      background: active && color,
      ...style,
    }}
    onClick={onClick}>
    {title}
    <div style={{color: !active ? color : 'white'}}>{icon}</div>
  </div>
);

const Controls = props => {
  const {setId, id, phone} = props;

  const transformLabel = i => ({
    transform: `translate(0, ${i < 2 ? `-20%` : '0%'}) rotate(${
      i % 2 ? '30deg' : '-30deg'
    })`
  });

  return (
    <>
      <div className="absolute " style={{top: 0, left: 0}}>
        <SourceElement
          {...WATER}
          className="m-1 water-label"
          phone={phone}
          active={id === WATER.id}
          onClick={() => setId(id !== WATER.id ? WATER.id : null)}
        />
      </div>
      <div className="absolute fire-label" style={{top: 0, right: 0}}>
        <SourceElement
          {...FIRE}
          phone={phone}
          className="m-1"
          active={id === FIRE.id}
          onClick={() => setId(id !== FIRE.id ? FIRE.id : null)}
        />
      </div>
      <div className="absolute earth-label" style={{bottom: 0, right: 0}}>
        <SourceElement
          {...EARTH}
          phone={phone}
          active={id === EARTH.id}
          className="m-1"
          onClick={() => setId(id !== EARTH.id ? EARTH.id : null)}
        />
      </div>
      <div className="absolute air-label" style={{left: 0, bottom: 0}}>
        <SourceElement
          phone={phone}
          active={id === AIR.id}
          {...AIR}
          className="m-1 "
          onClick={() => setId(id !== AIR.id ? AIR.id : null)}
        />
      </div>
    </>
  );
};

export default function AlchemyCircle(props) {
  const {className, acitve, phone, width, circleWidth, height, style} = props;
  // const [data, setData] = useState([...initData]);
  const [id, setId] = useState(null);
  const data = initData;
  const selectedElement = defaultData.find(d => d.id === id);

  const radius = Math.min((circleWidth * 2) / 3, 240);

  const MIN_ANGLE = 0.0385;
  const fData = data.map(d => {
    if (id === null) return d;
    if (d.parentId === id) return {...d, size: 10};
    return {...d, size: MIN_ANGLE};
  });
  const pData = pie(fData);
  const pieData = sortBy(pData, a => -a.startAngle);
  const svgRef = React.useRef();
  const outerArc = d3
    .arc()
    .outerRadius(radius - 30)
    .innerRadius(radius / 1.7);

  const innerArc = d3
    .arc()
    .outerRadius(radius / 1.7)
    .innerRadius(0);

  const labelArc = d3
    .arc()
    .innerRadius(radius - 30)
    .outerRadius(radius - 40);

  const strokeOpts = {
    bowing: 2,
    roughness: 2,
    strokeWidth: 1,
    fillWeight: 10,
    fill: 'none'
  };

  const outsideArcs = opts =>
    pieData.map(a => (
      <SketchyArcPath
        key={a.id}
        svgRef={svgRef}
        data={a}
        pathFn={d =>
          outerArc({
            ...d,
            startAngle: d.startAngle,
            endAngle: d.endAngle,
          })
        }
        defaultData={pieData.find(d => a.data.outerLabel === d.data.outerLabel)}
        style={{
          mixBlendMode: 'multiply',
          opacity: 0.5,
        }}
        options={{
          fill: a.data.fill,
          ...opts,
        }}
      />
    ));

  const labelArcs = pieData.map((a, i) => (
    <SketchyArcPath
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

  const insideArcs = (arc, opts) =>
    pieData.map(a => (
      <SimpleArcPath
        svgRef={svgRef}
        data={a}
        pathFn={d =>
          arc({
            ...d,
            startAngle: d.startAngle,
            endAngle: d.endAngle + 0.05,
          })
        }
        key={a.data.outerLabel}
        defaultData={initPieData.find(
          d => a.data.outerLabel === d.data.outerLabel,
        )}
        options={{
          fillWidth: 10,
          sketch: 30.8,
          bowing: 5,
        }}
        style={{
          mixBlendMode: 'multiply',
          opacity: 0.7,
          fill: a.data.fill,
          ...opts
        }}
      />
    ));

  const strokeInsideArcs = () =>
    pieData.map((a, i) => (
      <SketchyArcPath
        svgRef={svgRef}
        data={a}
        pathFn={d =>
          innerArc({
            ...d,
            startAngle: d.startAngle,
            endAngle: d.startAngle + 0.05,
          })
        }
        key={a.data.outerLabel}
        defaultData={initPieData.find(
          d => a.data.outerLabel === d.data.outerLabel,
        )}
        options={{
          fillWidth: 10,
          sketch: 30.8,
          bowing: 5,
          fill: a.data.fill,
          ...strokeOpts,
          strokeWidth: strokeWidth(i)
        }}
        style={{
          mixBlendMode: 'multiply',
          opacity: 0.7
        }}
      />
    ));

  return (
    <div
      className={`${className} h-full flex relative flex-col items-center justify-center`}
      style={{fontFamily: "'Cabin Sketch'", height, width}}>
      <h1>Alchemy</h1>
      <Description {...props} className="w-full mb-3 ">
        {selectedElement ? selectedElement.text : loremIpsum}
      </Description>
      <div className="relative mt-auto ">
        <CenterTxt
          className="absolute z-10"
          preview={
            selectedElement ? (
              <div
                className="text-white"
                style={{background: selectedElement.color}}>
                {selectedElement.icon}
              </div>
            ) : (
              '!!!'
            )
          }
          text={selectedElement ? selectedElement.text : 'YO'}
          style={{
            left: width / 2,
            bottom: radius,
          }}
        />
        <Controls {...props} id={id} setId={setId} />
        <Svg width={width} height={radius * 2}>
          <g
            id="labelArcs"
            style={{transform: `translate(${width / 2}px, ${radius}px)`}}>
            {labelArcs}
          </g>
          <g style={{transform: `translate(${width / 2}px, ${radius}px)`}}>
            {insideArcs(outerArc, {
              mixBlendMode: 'multiply',
              opacity: 0.5,
              // filter: `url(#gooey)`,
            })}
            {outsideArcs(strokeOpts, false)}
          </g>
          <g style={{transform: `translate(${width / 2}px, ${radius}px)`}}>
            {insideArcs(innerArc)}
            {strokeInsideArcs()}
          </g>
        </Svg>
      </div>
    </div>
  );
}
