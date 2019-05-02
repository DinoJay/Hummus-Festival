import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';

import scrollSnapPolyfill from 'css-scroll-snap-polyfill';

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
      const width = Math.min(window.innerWidth, maxWidth);
      const height = Math.min(window.innerHeight, maxHeight);

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

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center items-center"
      style={{
        scrollSnapPointsY: 'repeat(100vh)',
        scrollSnapType: 'y mandatory',
      }}>
      {size && (
        <>
          <section className="page background-0 flex justify-center overflow-hidden">
            <Landing {...size} className="overflow-hidden" />
          </section>
          <section className="page background flex justify-center">
            <MissionStatement {...size} className="flex justify-center" />
          </section>
          <section className="page ">
            <Circle {...size} className="p-2" />
          </section>
          <section className="page background-full flex justify-center">
            <Program {...size} className="flex justify-center" />
          </section>
          <section className="page flex background justify-center">
            <About {...size} className="flex justify-center" />
          </section>
        </>
      )}
    </div>
  );
}

export default hot(module)(App);
