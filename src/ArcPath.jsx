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

// import {interpolate} from 'flubber';

import compareMemoize from './components/utils/compareMemoize';

const getRoughId = (sketchShape, id) => {
  const {fill} = sketchShape.children[0].style;
  const regExp = /\(([^)]+)\)/;
  const matches = regExp.exec(fill);
  if (matches && Array.isArray(matches) && matches.length > 1) {
    const newId = matches[1].slice(2, -1);
    return newId;
    // setId(newId);
  }
};

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

export const SketchyArcPath = ({
  data,
  svgRef,
  pathFn,
  defaultData,
  options,
  animOpts = {},
  ...props
}) => {
  const olData = memo(data);
  const ref = React.useRef();
  const refId = React.useRef();
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
        duration: 200,
        ...animOpts,
        // ease: easing.easeInOut,
        // flip: Infinity,
      })
        .pipe(d => pathFn(d))
        .start(d => {
          const sketchShape = rc.path(d, options);
          if (refId.current) {
            const p = document.getElementById(refId.current);
            const parent = p ? p.parentNode : null;
            p && p.parentNode.removeChild(p);
            if (parent && parent.children && parent.children.length === 0) {
              const pp = parent ? parent.parentNode : null;

              if (pp) pp.removeChild(parent);
            }
          }
          setShape(sketchShape.outerHTML);
          const newId = getRoughId(sketchShape);
          refId.current = newId;

          setShape(sketchShape.outerHTML);
        });
    },
    [compareMemoize(data)],
  );

  useEffect(() => {});

  return <g {...props} ref={ref} dangerouslySetInnerHTML={{__html: shape}} />;
};

export const SimpleArcPath = ({
  data,
  svgRef,
  pathFn,
  defaultData,
  options,
  animOpts = {},
  ...props
}) => {
  const olData = memo(data);
  const ref = React.useRef();
  const refId = React.useRef();
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
        duration: 200,
        ...animOpts,
      })
        .pipe(d => pathFn(d))
        .start(d => {
          // const sketchShape = rc.path(d, options);
          // if (refId.current) {
          //   const p = document.getElementById(refId.current);
          //   const parent = p ? p.parentNode : null;
          //   p && p.parentNode.removeChild(p);
          //   if (parent && parent.children && parent.children.length === 0) {
          //     const pp = parent ? parent.parentNode : null;
          //
          //     if (pp) pp.removeChild(parent);
          //   }
          // }
          // setShape(sketchShape.outerHTML);
          // const newId = getRoughId(sketchShape);
          // refId.current = newId;

          setShape(d);
        });
    },
    [compareMemoize(data)],
  );

  useEffect(() => {});

  return <path {...props} ref={ref} d={shape} />;
};

// const MemPath = ({d, defaultD = 'M0,0 L10,0 L10,10Z', ...props}) => {
//   const oldD = memo(d);
//   const ref = React.createRef();
//   const [pathStr, setPathStr] = useState(null);
//
//   // if (oldD !== d)
//
//   console.log('d', d);
//
//   useEffect(
//     () => {
//       if (ref.current) {
//         const arg = oldD ? [oldD, d || defaultD] : [defaultD, d || defaultD];
//         const shape = styler(ref.current);
//         tween({
//           from: 0,
//           to: 1,
//           duration: 500,
//           ease: easing.linear,
//           // flip: Infinity,
//         })
//           .pipe(interpolate(...arg, {maxSegmentLength: 1}))
//           .start(setPathStr);
//       }
//     },
//     [d],
//   );
//
//   return <path ref={ref} d={pathStr} {...props} />;
// };

function circleGen() {
  // set defaults
  let r = function(d) {
    return d.radius;
  };

  let x = function(d) {
    return d.x;
  };

  let y = function(d) {
    return d.y;
  };

  // returned function to generate circle path
  function circle(d) {
    const cx = d3.functor(x).call(this, d);

    const cy = d3.functor(y).call(this, d);

    const myr = d3.functor(r).call(this, d);

    return (
      `M${cx},${cy} ` +
      `m${-myr}, 0 ` +
      `a${myr},${myr} 0 1,0 ${myr * 2},0 ` +
      `a${myr},${myr} 0 1,0 ${-myr * 2},0Z`
    );
  }

  // getter-setter methods
  circle.r = function(value) {
    if (!arguments.length) return r;
    r = value;
    return circle;
  };
  circle.x = function(value) {
    if (!arguments.length) return x;
    x = value;
    return circle;
  };
  circle.y = function(value) {
    if (!arguments.length) return y;
    y = value;
    return circle;
  };

  return circle;
}

// export const Ellipse = ({
//   d,
//   svgRef,
//   sketchOpts,
//   animOpts = {},
//   interval = 0,
//   times = 1,
//   ...props
// }) => {
//   const ref = React.createRef();
//
//   const [shape, setShape] = useState(null);
//
//   useEffect(
//     () => {
//       const rc = rough.svg(svgRef.current);
//
//       const intervalId = setIntervalX(
//         () => {
//           const sketchShape = rc.ellipse(300, 100, 150, 80, {...sketchOpts});
//           console.log('sketchShape', sketchShape);
//           setShape(sketchShape.outerHTML);
//         },
//         interval,
//         times,
//       );
//
//       return () => {
//         clearInterval(intervalId);
//       };
//     },
//     [d],
//   );
//
//   return <g {...props} ref={ref} dangerouslySetInnerHTML={{__html: shape}} />;
// };
//
//

export const SimplePath = ({
  d,
  svgRef,
  sketchOpts,
  animOpts = {},
  interval = 0,
  times = 1,
  ...props
}) => {
  const ref = React.useRef();

  const [shape, setShape] = useState(null);

  const refId = React.useRef();
  useEffect(
    () => {
      const rc = rough.svg(svgRef.current);

      const intervalId = setIntervalX(
        () => {
          const sketchShape = rc.path(d, {...sketchOpts});
          const {fill} = sketchShape.children[0].style;

          if (refId.current) {
            const p = document.getElementById(refId.current);
            p.parentNode.removeChild(p);
          }
          setShape(sketchShape.outerHTML);
          const newId = getRoughId(sketchShape);
          refId.current = newId;

          // const regExp = /\(([^)]+)\)/;
          // const matches = regExp.exec(fill);
          // if (matches && Array.isArray(matches) && matches.length > 1) {
          //   const newId = matches[1].slice(2, -1);
          //   const p = document.getElementById(refId.current);
          //   refId.current = newId;
          //   if (p) {
          //     p.parentNode.removeChild(p);
          //   }
          //   // setId(newId);
          // }
          // p.remove();
          // console.log('sketchShape', p);
        },
        interval,
        times,
      );

      // TODO: remove stuff
      return () => {
        clearInterval(intervalId);
      };
    },
    [d],
  );

  return <g {...props} ref={ref} dangerouslySetInnerHTML={{__html: shape}} />;
};

export const AnimPath = props => {
  const {
    d,
    svgRef,
    sketchOpts,
    animOpts = {},
    interval = 0,
    times = 1,
    style,
    className,
  } = props;
  const [shape, setShape] = useState(null);

  useEffect(
    () => {
      const rc = rough.svg(svgRef.current);

      const intervalId = setIntervalX(
        () => {
          const sketchShape = rc.path(d, {...sketchOpts}).outerHTML;
          // TODO: remove defs
          setShape(sketchShape);
        },
        interval,
        times,
      );

      return () => clearInterval(intervalId);
    },
    [d, sketchOpts],
  );

  return (
    <g
      className={className}
      style={style}
      dangerouslySetInnerHTML={{__html: shape}}
    />
  );
};
