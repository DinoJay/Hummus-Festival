import React, {useState, useMemo, useEffect} from 'react';
import isEqual from 'lodash/isEqual';
import * as d3 from 'd3';
import cloneDeep from 'lodash/cloneDeep';

import * as rough from 'roughjs/dist/rough.umd';

import {styler, tween, easing} from 'popmotion';

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
  ...props
}) => {
  const olData = memo(data);
  const ref = React.createRef();

  useEffect(
    () => {
      if (ref.current) {
        const rc = rough.svg(svgRef.current);
        tween({
          from: {
            startAngle: olData ? olData.startAngle : defaultData.startAngle,
            endAngle: olData ? olData.endAngle : defaultData.endAngle
          },
          to: {startAngle: data.startAngle, endAngle: data.endAngle},
          duration: 400,
          ease: easing.backOut,
          // ease: easing.easeInOut,
          // flip: Infinity,
        })
          .pipe(d => pathFn(d))
          .start({
            update(d) {
              d3.select(ref.current)
                .selectAll('path')
                .remove();

              const sketchShape = rc.path(d, options);
              if (ref.current) ref.current.appendChild(sketchShape);
            },
            complete() {}
          }); // }, 400);
      }
    },
    [data.endAngle],
  );
  return <g {...props} ref={ref} />;
};
