import React, {useState, useMemo, useEffect} from 'react';
import isEqual from 'lodash/isEqual';
import * as d3 from 'd3';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';

import * as rough from 'roughjs/dist/rough.umd';
import {
  styler,
  chain,
  tween,
  keyframes,
  spring,
  easing,
  schedule,
  everyFrame,
  timeline
} from 'popmotion';

import {interpolate} from 'flubber';

import compareMemoize from './components/utils/compareMemoize';

function setIntervalX(callback, delay, repetitions) {
  let x = 0;
  const intervalId = setInterval(() => {
    callback();

    if (++x === repetitions) {
      clearInterval(intervalId);
    }
  }, delay);

  return intervalId;
}

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

export const ArcPath = ({
  data,
  svgRef,
  pathFn,
  defaultData,
  options,
  animOpts = {},
  ...props
}) => {
  const olData = memo(data);
  const ref = React.createRef();
  const [shape, setShape] = useState(null);

  useEffect(
    () => {
      const rc = rough.svg(svgRef.current);
      tween({
        from: {
          startAngle: olData ? olData.startAngle : defaultData.startAngle,
          endAngle: olData ? olData.endAngle : defaultData.endAngle,
        },
        to: {startAngle: data.startAngle, endAngle: data.endAngle},
        duration: 700,
        // ease: easing.backOut,
        ...animOpts,
        // ease: easing.easeInOut,
        // flip: Infinity,
      })
        .pipe(d => pathFn(d))
        .start(d => {
          setShape(rc.path(d, options).outerHTML);
        });
    },
    [compareMemoize(data)],
  );
  return <g {...props} ref={ref} dangerouslySetInnerHTML={{__html: shape}} />;
};

const MemPath = ({d, defaultD = 'M0,0 L10,0 L10,10Z', ...props}) => {
  const oldD = memo(d);
  const ref = React.createRef();
  const [pathStr, setPathStr] = useState(null);

  // if (oldD !== d)

  console.log('d', d);

  useEffect(
    () => {
      if (ref.current) {
        const arg = oldD ? [oldD, d || defaultD] : [defaultD, d || defaultD];
        const shape = styler(ref.current);
        tween({
          from: 0,
          to: 1,
          duration: 500,
          ease: easing.linear,
          // flip: Infinity,
        })
          .pipe(interpolate(...arg, {maxSegmentLength: 1}))
          .start(setPathStr);
      }
    },
    [d],
  );

  return <path ref={ref} d={pathStr} {...props} />;
};

export const SimplePath = ({
  d,
  svgRef,
  sketchOpts,
  animOpts = {},
  interval = 0,
  times = 1,
  ...props
}) => {
  const ref = React.createRef();

  const [shape, setShape] = useState(null);

  useEffect(
    () => {
      const rc = rough.svg(svgRef.current);

      const intervalId = setIntervalX(
        () => {
          const sketchShape = rc.path(d, {...sketchOpts});
          setShape(sketchShape.outerHTML);
        },
        interval,
        times,
      );

      return () => clearInterval(intervalId);
    },
    [d],
  );

  return <g {...props} ref={ref} dangerouslySetInnerHTML={{__html: shape}} />;
};

export const AnimPath = ({
  d,
  svgRef,
  sketchOpts,
  animOpts = {},
  interval = 0,
  times = 1,
  style,
  ...props
}) => {
  const ref = React.createRef();

  const [shape, setShape] = useState(null);

  useEffect(
    () => {
      const rc = rough.svg(svgRef.current);

      const intervalId = setIntervalX(
        () => {
          const sketchShape = rc.path(d, {...sketchOpts});
          const p = d3.select(sketchShape).selectAll('path');
          if (p.node()) {
            const dStr = p.node().getAttribute('d');
            setShape(dStr);
          }
          // const d = p.attr('d');
          // const d = !p.empty() || p.attr('d');
          // console.log('d', d);
        },
        interval,
        times,
      );

      return () => clearInterval(intervalId);
    },
    [d],
  );

  return <MemPath d={shape} style={style} />;
};
