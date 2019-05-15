import React, {useState, useEffect} from 'react';

// import scrollSnapPolyfill from 'css-scroll-snap-polyfill';

import {hot} from 'react-hot-loader';

import Circle from './Circle';
import Landing from './Landing';
import MissionStatement from './MissionStatement';
import Program from './Program';
import About from './About';

function App() {
  const [size, setSize] = useState(null);

  const ref = React.useRef();
  const maxWidth = 600;
  const maxHeight = 2000;
  useEffect(() => {
    const resize = () => {
      const w = Math.min(window.innerWidth, maxWidth);
      const h = Math.min(window.innerHeight, maxHeight);
      const height = Math.max(w, h);
      const width = Math.min(w, h);

      const circleWidth = width - width / 3.3;

      setSize({
        width,
        height,
        circleWidth,
        phone: width < 450,
      });
    };

    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  const {height = null} = size || {};
  return (
    <div
      ref={ref}
      className="flex flex-col justify-center items-center"
      style={
        {
          // scrollSnapPointsY: 'repeat(100vh)',
          // scrollSnapType: 'y mandatory',
        }
      }>
      {size && (
        <>
          <section
            className="page border-2 background-0 flex justify-center overflow-hidden"
            style={{height}}>
            <Landing
              {...size}
              className="overflow-hidden flex flex-col justify-center"
            />
          </section>
          <section
            style={{height}}
            className="page background flex justify-center border-2  ">
            <MissionStatement {...size} className="flex " />
          </section>
          <section
            style={{height}}
            className="page flex justify-center background-0  ">
            <Circle {...size} className="p-2" />
          </section>
          <section
            className="page background-full flex justify-center border-2"
            style={{overflow: 'visible', height}}>
            <Program {...size} className="flex justify-center" />
          </section>
          <section
            style={{height}}
            className="page flex background justify-center border-2 ">
            <About {...size} className="flex justify-center" />
          </section>
        </>
      )}
    </div>
  );
}

export default hot(module)(App);
