import React, {useState, useMemo, useEffect} from 'react';
import isEqual from 'lodash/isEqual';
import * as d3 from 'd3';
import cloneDeep from 'lodash/cloneDeep';

import * as rough from 'roughjs/dist/rough-async.umd';
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
// import worker from './worker';

// import {interpolate} from 'flubber';

import compareMemoize from './components/utils/compareMemoize';

// console.log('worker', worker);

export const SvgContext = React.createContext({current: null});

export const Svg = ({children, ...props}) => {
  const ref = React.useRef();
  const [loaded, setLoaded] = useState(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <SvgContext.Provider value={ref}>
      <svg {...props} ref={ref}>
        {loaded && children}
      </svg>
    </SvgContext.Provider>
  );
};

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
  pathFn,
  defaultData,
  options,
  duration = 100,
  animOpts = {},
  ...props
}) => {
  const olData = memo(data);
  const ref = React.useRef();
  const refId = React.useRef();
  // const refId = React.useRef();
  const [shape, setShape] = useState(null);

  const svgRef = React.useContext(SvgContext);

  useEffect(() => {
    const rc = rough.svg(svgRef.current, {workerURL: './worker.js'});
    tween({
      from: {
        startAngle: olData ? olData.startAngle : defaultData.startAngle,
        endAngle: olData ? olData.endAngle : defaultData.endAngle
      },
      to: {startAngle: data.startAngle, endAngle: data.endAngle},
      duration,
      ...animOpts
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
        // setShape(sketchShape.outerHTML);
        sketchShape.then(sk => {
          const newId = getRoughId(sk);
          refId.current = newId;

          setShape(sk.outerHTML);
        });
      });
  }, [compareMemoize(data)]);

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
  const [shape, setShape] = useState(null);

  useEffect(() => {
    tween({
      from: {
        startAngle: olData ? olData.startAngle : defaultData.startAngle,
        endAngle: olData ? olData.endAngle : defaultData.endAngle
      },
      to: {startAngle: data.startAngle, endAngle: data.endAngle},
      duration: 200,
      ...animOpts
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
  }, [compareMemoize(data)]);

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
  sketchOpts,
  animOpts = {},
  interval = 0,
  times = 1,
  ...props
}) => {
  const ref = React.useRef();

  const svgRef = React.useContext(SvgContext);
  const [shape, setShape] = useState(null);

  const refId = React.useRef();
  useEffect(() => {
    let intervalId = null;
    if (svgRef.current) {
      const rc = rough.svg(svgRef.current, {workerURL: './worker.js'});

      intervalId = setIntervalX(
        () => {
          const sketchShape = rc.path(d, {...sketchOpts});
          // const {fill} = sketchShape.children[0].style;

          sketchShape.then(sk => {
            if (refId.current) {
              const p = document.getElementById(refId.current);
              p.parentNode.removeChild(p);
            }
            setShape(sk.outerHTML);
          });
          // const newId = getRoughId(sketchShape);
          // refId.current = newId;
        },
        interval,
        times,
      );
    }

    // TODO: remove stuff
    return () => {
      clearInterval(intervalId);
    };
  }, [d]);

  return <g {...props} ref={ref} dangerouslySetInnerHTML={{__html: shape}} />;
};

export const AnimPath = props => {
  const {
    d,
    sketchOpts,
    animOpts = {},
    interval = 0,
    times = 1,
    style,
    className
  } = props;
  const [shape, setShape] = useState(null);

  const svgRef = React.useContext(SvgContext);

  useEffect(() => {
    const rc = rough.svg(svgRef.current, {workerURL: './worker.js'});

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
  }, [d, sketchOpts]);

  return (
    <g
      className={className}
      style={style}
      dangerouslySetInnerHTML={{__html: shape}}
    />
  );
};
