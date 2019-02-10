import React, {useState, useMemo, useEffect} from 'react';
import isEqual from 'lodash/isEqual';
import * as d3 from 'd3';
import cloneDeep from 'lodash/cloneDeep';

import * as rough from 'roughjs/dist/rough.umd';
import {
  styler,
  chain,
  delay,
  tween,
  keyframes,
  spring,
  easing,
  schedule,
  everyframe
} from 'popmotion';
import compareMemoize from './components/utils/compareMemoize';

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

export const SimplePath = ({
  d,
  svgRef,
  sketchOpts,
  animOpts = {},
  ...props
}) => {
  const ref = React.createRef();

  const [shape, setShape] = useState(null);

  useEffect(() => {
    const rc = rough.svg(svgRef.current);

    chain(
      keyframes({
        values: [{sketch: 1}, {sketch: 20}],
        duration: 5000,
        easings: easing.easeInOut,

        // times: [0, 0.2, 1],
        // loop: Infinity,
      }),
    ).start(o => {
      const sketchShape = rc.path(d, {...sketchOpts});
      setShape(sketchShape.outerHTML);
    });
  }, [d]);

  return <g {...props} ref={ref} dangerouslySetInnerHTML={{__html: shape}} />;
};
