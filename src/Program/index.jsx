import React, {useState, useMemo, useEffect} from 'react';
import {group} from 'd3-array';
import {timeParse, timeFormat} from 'd3-time-format';
import {timeWeek} from 'd3-time';
import max from 'lodash/max';
import min from 'lodash/min';
import {wrapGrid} from 'animate-css-grid';
//
import chroma from 'chroma-js';

// import PropTypes from 'prop-types';
// import uniqBy from 'lodash/uniqBy';
// import isEqual from 'lodash/isEqual';
// import cloneDeep from 'lodash/cloneDeep';
// import sortBy from 'lodash/sortBy';
// import {styler, tween, easing} from 'popmotion';

import posed, {PoseGroup} from 'react-pose';
import {stickman, stickman2} from './progStickmen';
import {FIRE, WATER, EARTH, AIR, icons} from '../alchemyElements';

import {SimplePath, Svg} from '../ArcPath';

import calendar from './events';

const themeWeeks = [FIRE, EARTH, AIR, WATER];

const events = calendar[0].items;

const eventTypes = [FIRE, WATER, EARTH, AIR];

const textColor = {
  [FIRE]: 'text-red',
  [WATER]: 'text-blue',
  [EARTH]: 'text-yellow-darker',
  [AIR]: 'text-green'
};

const Delay = props => {
  const {delay, children, ...restProps} = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(id);
  });

  if (visible) return children;
  return null;
};

const SelectedWeek = posed(
  React.forwardRef((props, ref) => {
    const {
      selectedWeek,
      setSelectedWeek,
      onClick,
      vals,
      startDay,
      endDay,
      theme
    } = props;

    return (
      <div ref={ref} className="h-full w-full flex flex-col">
        <h2 className="flex justify-between items-center my-0 mx-2">
          <div>{startDay}</div> <div>{icons[theme].svg}</div>{' '}
          <div>{endDay}</div>
        </h2>
        <div className="flex-grow overflow-y-auto">
          {vals.map(d => (
            <div className="capitalize text-xl mb-2">
              <div className="font-bold">{formatDay(d.startDate)}</div>
              <div>{d.summary}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }),
)();

const PosedDiv = posed.div({
  enter: {
    width: ({shrink}) => '90%' || '100%',
    // maxHeight: 200,
    // staggerChildren: '100%',
    delayChildren: 200,
  },
  exit: {
    width: '0%',
    height: '0%',
    staggerChildren: '100%',
    transition: {
      duration: 700,
    },
  }

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
  transform: 'translate(-25%,0%) rotate(90deg)'
  // transformOrigin: 'left top 0',
};

const sketchOpts = {
  bowing: 20,
  roughness: 0.9,
  strokeWidth: 4,
  fillWeight: 10,
  fill: chroma('#01a9d0').alpha(0.2),
  stroke: BLACK,
  fillStyle: 'zigzag'
};

const format = '%Y-%m-%dT%H:%M:%S%Z';
const formatWeekDate = timeFormat('%b %d');
const formatDay = timeFormat('%b %d, %H:%MH');

const EventWeek = posed(
  React.forwardRef((props, ref) => {
    const {
      col,
      row,
      id,
      setSelectedWeek,
      endDay,
      startWeekStr,
      i,
      theme,
      width,
      onClick
    } = props;

    return (
      <div
        ref={ref}
        className="event flex relative m-1 text-2xl md:text:2xl"
        style={{
          transform: `rotate(${i % 2 ? -10 : 6}deg)`,
        }}>
        <div
          className="w-full flex m-1 bg-white border-yo border-black border-solid"
          style={{
            boxShadow: '5px 10px #404040',
          }}>
          <div className="absolute m-4 top-0 left-0">{startWeekStr}</div>
          <div className="m-auto">
            {icons[theme][width > 400 ? 'svgLg' : 'svg']}
          </div>
          <div className="absolute m-4 right-0 bottom-0 mr-6 mb-2">
            {endDay}
          </div>
        </div>
      </div>
    );
  }),
)({
  enter: {opacity: 1},
  exit: {opacity: 0}
});

const EventWeekWrapper = posed(
  React.forwardRef((props, ref) => {
    const {
      selectedWeek,
      event,
      theme,
      onClick,
      col,
      row,
      id,
      setSelectedWeek,
      selected
    } = props;

    return (
      <div
        ref={ref}
        key={theme}
        className={`${selectedWeek &&
          'detail-events speech-bubble'} flex justify-center items-center justify-center cursor-pointer`}
        onClick={() => {
          setSelectedWeek(selectedWeek ? null : event);
        }}
        style={{
          gridColumnStart: !selected && col,
          gridRowStart: !selected && row,
          gridRowEnd: !selected && 'span 3',
          gridColEnd: !selected && 'span 3',
        }}>
        {selected ? (
          <SelectedWeek {...props} key={theme} />
        ) : (
          <EventWeek {...props} key={theme} />
        )}
      </div>
    );
  }),
)();

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
      endWeek: timeWeek.offset(startDate, 1)
    };
  });

  const tmpGroupedEvents = [
    ...group(parsedEvents, d => formatWeekDate(d.startWeek)).entries()
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
      values: values.sort((a, b) => a.startDate - b.startDate),
    };
  });

  tmpGroupedEvents[tmpGroupedEvents.length - 2].values = [
    ...tmpGroupedEvents[tmpGroupedEvents.length - 2].values,
    ...tmpGroupedEvents[tmpGroupedEvents.length - 1].values,
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

  const gridRef = React.useRef();
  useEffect(() => {
    // wrapGrid(gridRef.current);
  }, []);

  const filteredEvents = groupedEvents
    .filter(d => !selectedWeek || d.theme === selectedWeek.theme)
    .map(d => ({...d, vals: d.values}));

  // console.log('filteredEvents', selectedWeek);

  return (
    <div
      className="flex flex-col items-center w-full relative"
      style={{fontFamily: "'Cabin Sketch'"}}>
      <h1 className="">Program</h1>
      <div
        ref={gridRef}
        className={`flex-grow ${selectedWeek &&
          'fixed top-0 left-0 ml-2 z-50 sand md:static'}`}
        style={{
          display: 'grid',
          gridTemplateColumns: `${width / 2 - 10}px ${width / 2 - 10}px`,
          gridTemplateRows: `repeat(20, 5vh)`,
        }}>
        <PoseGroup>
          {filteredEvents.map((d, i) => (
            <EventWeekWrapper
              key={d.theme}
              {...props}
              {...d}
              event={d}
              selected={selectedWeek && d.theme === selectedWeek.theme}
              selectedWeek={selectedWeek}
              setSelectedWeek={setSelectedWeek}
              i={i}
            />
          ))}
          <PosedDiv
            className="flex justify-center items-center relative"
            key="st"
            style={{
              gridRowStart: 12,
              gridColumnStart: 2,
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
                  fill: 'rgba(1,169,208,0.14)',
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
