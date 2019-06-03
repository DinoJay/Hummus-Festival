import React, {useState, useMemo, useEffect} from 'react';
import {group} from 'd3-array';
import {timeParse, timeFormat} from 'd3-time-format';
import {timeWeek} from 'd3-time';
import max from 'lodash/max';
import min from 'lodash/min';

import chroma from 'chroma-js';

// import PropTypes from 'prop-types';
// import uniqBy from 'lodash/uniqBy';
// import isEqual from 'lodash/isEqual';
// import cloneDeep from 'lodash/cloneDeep';
// import sortBy from 'lodash/sortBy';
// import {styler, tween, easing} from 'popmotion';

import posed, {PoseGroup} from 'react-pose';
import Description from '../components/utils/Description';
import {FIRE, WATER, EARTH, AIR, icons} from '../alchemyElements';

import {SimplePath, Svg} from '../ArcPath';

import calendar from './events';

const themeWeeks = [FIRE, EARTH, AIR, WATER];

const stickman2 =
  'm 0,0 -8.14711,0.0825 -1.42785,-1.89768 -0.16798,-1.48507 1.42784,-1.15508 6.00534,-0.41258 0.41997,-12.2523 0.41995,-5.9818 0.20998,-3.50648 0.33596,-8.58077 -0.46195,-5.07422 -8.56707,0.74258 -1.93179,-5.11547 -1.63782,-6.60058 -0.67193,-2.59896 0.20998,-2.55771 0.50394,-1.6914 0.9239,-0.90758 1.38586,0.0825 0.75591,0.61881 0.62993,2.14519 0.9239,3.6303 2.01579,7.30194 2.51972,-0.37125 3.02368,-0.28883 h 3.35962 l 0.46195,-0.70133 -0.20997,-1.89766 -0.37796,-0.94882 -0.75591,-1.36141 -0.54595,-2.72269 -0.12598,-2.599 1.00789,-2.14518 1.00788,-1.65015 0.96591,-1.0726 0.67193,-0.90758 2.6037,0.37128 1.38585,-0.33003 2.18377,0.12377 0.9239,1.11384 1.30186,2.2277 0.35633,1.84348 -0.33472,1.93888 -0.48357,1.4981 -0.79791,2.47526 -1.30186,1.44383 -0.8399,0.86632 0.16797,2.31024 0.50395,0.20625 9.65896,-0.28883 1.00788,-4.33156 0.67193,-3.46533 1.63782,-4.90917 1.34386,-1.32012 1.30186,-0.41253 1.21786,0.33002 0.9659,0.82508 0.46194,1.11384 -1.7638,6.55933 -2.64571,8.58075 -0.9659,2.0214 -10.28888,0.20633 -0.67193,0.37125 0.084,6.35304 -0.084,9.40578 -0.20997,3.01156 0.46195,7.54945 0.37795,8.99324 0.12599,1.69141 2.01578,0.041 2.22576,0.041 2.01578,0.49499 0.79791,0.66008 -0.084,1.60891 -0.37797,0.66008 -2.77169,0.16494 -2.98167,0.2063 -3.31765,-0.2475 h -1.97379 -0.12598 l -0.37797,-0.9489 -0.33595,-3.67156 -0.58794,-5.81671 -0.46195,-8.58075 -1.0079,-0.37125 -0.96588,0.28875 -0.54594,4.04289 -0.16798,4.9091 -0.33598,3.96031 -0.29396,4.37289 -0.9239,0.90766 -1.09188,0.66 z';

const events = calendar[0].items;

const eventTypes = [FIRE, WATER, EARTH, AIR];

const textColor = {
  [FIRE]: 'text-red',
  [WATER]: 'text-blue',
  [EARTH]: 'text-yellow-darker',
  [AIR]: 'text-green',
};

const stickman =
  'm 0,0 -1.54965,-2.12887 0.7098,-2.93861 5.17338,2.06968 -1.88768,-13.88638 -1.05749,-4.34342 1.22144,-2.6793 v 0 l -2.34926,-3.25586 -0.44745,-3.03334 -0.96391,-9.89753 1.41136,12.93087 2.34926,3.25586 -2.43183,1.80091 -3.36705,-0.0184 -0.58691,-1.73631 0.87291,-3.1466 -1.96405,-4.10514 -1.34243,-4.18764 -0.67118,-5.10689 v -4.18764 0 l 1.56614,-4.80044 2.90858,-1.83847 3.46794,-1.02138 -0.11184,-2.85985 -2.39882,-2.38854 v 0 l -0.77205,-3.58833 v 0 l 1.68352,-3.1859 2.34924,-1.32779 2.49415,-0.64236 3.13234,1.63418 1.53542,2.04274 0.14258,3.57483 -0.78305,2.96199 -0.22375,1.83844 2.57298,0.71494 2.57296,0.81711 1.67804,0.51067 1.78989,1.83853 1.1187,2.55338 v 4.08549 l 0.44745,4.90265 0.82145,4.80044 -0.51505,3.34231 2.41679,2.22067 -1.01673,1.95513 c -1.00914,0.75444 -1.80004,2.0399 -2.80917,0.51476 l -1.77071,-1.94942 -0.87345,-2.53104 -0.18084,-3.4727 0.13791,-7.12721 0.043,10.41801 0.87346,2.71294 1.97847,5.15167 v 0 l 1.1187,6.12821 1.90177,8.47739 -1.47201,5.24856 4.95643,-2.10567 2.77468,1.72034 -0.74246,2.92896 -4.42975,0.86668 h -3.16412 l -2.53126,-0.14444 -0.63286,-4.91108 -0.94923,-4.18891 -0.3164,-3.75555 -1.72398,-7.97333 -3.94957,0.51321 v 0 l 0.37125,7.12192 0.3979,8.57152 -0.31639,6.06665 z';

const PosedDiv = posed.div({
  enter: {
    width: ({shrink}) => '90%' || '100%',
    height: '100%',
    // staggerChildren: '100%',
    delayChildren: 200
  },
  exit: {
    width: '0%',
    height: '0%',
    staggerChildren: '100%',
    transition: {
      duration: 700
    }
  },

  // You can make a custom transition for the flip-powered
  // shuffling animation by overriding `flip`. You can even
  // add other properties to animate while the flip animation
  // is in progress. Uncomment the following code to try it out!
  // flip: {
  //   scale: 1,
  //   transition: {
  //     scale: {
  //       type: 'spring',
  //       velocity: 10
  //     },
  //     default: {
  //       type: 'spring'
  //     }
  //   }
  // }
});

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

const format = '%Y-%m-%dT%H:%M:%S%Z';
const formatWeekDate = timeFormat('%b %d');
const formatDay = timeFormat('%b %d, %H:%MH');

export default function Program(props) {
  const {className, width, height, style} = props;

  // "2019-04-29T13:26:33.853Z"

  const parsedEvents = events.map(d => {
    const startDate = timeParse(format)(d.start.dateTime);
    const startWeek = timeWeek(startDate);
    return {
      ...d,
      startDate,
      startWeek,
      weekStr: formatWeekDate(startWeek),
      endWeek: timeWeek.offset(startDate, 1),
    };
  });

  const tmpGroupedEvents = [
    ...group(parsedEvents, d => formatWeekDate(d.startWeek)).entries(),
  ].map(([key, values], i) => {
    const maxDate = values.reduce(
      (acc, d) => (d.startDate > acc ? d.startDate : acc),
      values[0].startDate,
    );
    const minDate = values.reduce(
      (acc, d) => (d.startDate < acc ? d.startDate : acc),
      values[0].startDate,
    );

    return {
      theme: themeWeeks[i],
      key,
      startWeekStr: formatWeekDate(values[0].startDate),
      endWeekStr: formatWeekDate(maxDate),
      startDay: formatWeekDate(minDate),
      endDay: formatWeekDate(maxDate),
      values: values.sort((a, b) => a.startDate - b.startDate)
    };
  });

  tmpGroupedEvents[tmpGroupedEvents.length - 2].values = [
    ...tmpGroupedEvents[tmpGroupedEvents.length - 2].values,
    ...tmpGroupedEvents[tmpGroupedEvents.length - 1].values
  ];
  const groupedEvents = tmpGroupedEvents.slice(0, 4);
  // .slice(0, 4);

  const [selectedWeek, setSelectedWeek] = useState(null);

  groupedEvents[0].col = 1;
  groupedEvents[0].row = 1;

  groupedEvents[1].col = 1;
  groupedEvents[1].row = 6;

  groupedEvents[2].col = 1;
  groupedEvents[2].row = 11;

  groupedEvents[3].col = 2;
  groupedEvents[3].row = 3;

  return (
    <div
      className="flex flex-col items-center w-full relative"
      style={{fontFamily: "'Cabin Sketch'"}}>
      <h1 className="">Program</h1>
      <div
        className="flex-grow"
        style={{
          display: 'grid',
          gridTemplateColumns: `${width / 2 - 10}px ${width / 2 - 10}px`,
          gridTemplateRows: `repeat(20, 5%)`
        }}>
        <PoseGroup>
          {selectedWeek ? (
            <PosedDiv
              shrink
              width={width}
              className="z-50 bg-white speech-bubble overflow-hidden detail-events"
              onClick={() => setSelectedWeek(null)}
              key={selectedWeek.key}>
              <div className="h-full flex flex-col">
                <h2 className="flex justify-between items-center my-0 mx-2">
                  <div>{selectedWeek.startDay}</div>{' '}
                  <div>{icons[selectedWeek.theme].svg}</div>{' '}
                  <div>{selectedWeek.endDay}</div>
                </h2>
                <div className="flex-grow overflow-y-auto">
                  {selectedWeek.values.map(d => (
                    <div className="capitalize text-xl mb-2">
                      <div className="font-bold">{formatDay(d.startDate)}</div>
                      <div>{d.summary}</div>
                    </div>
                  ))}
                </div>
              </div>
            </PosedDiv>
          ) : (
            groupedEvents.map((d, i) => (
              <PosedDiv
                className="flex justify-center items-center cursor-pointer"
                key={d.key}
                onClick={() => setSelectedWeek(d)}
                style={{
                  gridColumnStart: d.col,
                  gridRowStart: d.row,
                  gridRowEnd: 'span 3'
                }}>
                <div
                  className="event flex relative m-1 text-2xl md: text:2xl"
                  style={{
                    transform: `rotate(${i % 2 ? -10 : 6}deg)`
                  }}>
                  <div
                    className="w-full flex m-1 bg-white border-yo border-black border-solid"
                    style={{
                      boxShadow: '5px 10px #404040'
                    }}>
                    <div className="absolute m-4 top-0 left-0">
                      {d.startWeekStr}
                    </div>
                    <div className="m-auto">
                      {icons[d.theme][width > 400 ? 'svg' : 'svg']}
                    </div>
                    <div className="absolute m-4 right-0 bottom-0 mr-6 mb-2">
                      {d.endDay}
                    </div>
                  </div>
                </div>
              </PosedDiv>
            ))
          )}
          <PosedDiv
            className="flex justify-center items-center relative"
            key="st"
            style={{
              gridRowStart: selectedWeek ? 11 : 11,
              gridColumnStart: 2
            }}>
            <Svg className="my-4 overflow-visible">
              <SimplePath
                d={selectedWeek ? stickman2 : stickman}
                times={50}
                interval={300}
                sketchOpts={{
                  roughness: 0.25,
                  bowing: 100,
                  strokeWidth: 1,
                  stroke: BLACK,
                  fillStyle: 'zigzag',
                  fillWeight: 5,
                  fill: 'rgba(1,169,208,0.14)'
                }}
                className={
                  selectedWeek
                    ? 'program-stickman-selected'
                    : 'program-stickman'
                }
              />
            </Svg>
          </PosedDiv>
        </PoseGroup>
      </div>
    </div>
  );
}
