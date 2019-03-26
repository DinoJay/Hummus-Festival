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
  const maxWidth = 700;
  const maxHeight = 2000;
  useEffect(() => {
    const resize = () => {
      const width = Math.min(window.innerWidth, maxWidth);
      const height = Math.min(window.innerHeight, maxHeight);
      console.log('height', height);

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

    // scrollSnapPolyfill();

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
          <section className="h-screen flex flex-col justify-center background-0">
            <Landing {...size} className="flex flex-col items-center " />
          </section>
          <section className="h-screen ">
            <MissionStatement {...size} className="flex justify-center" />
          </section>
          <section className="h-screen ">
            <Circle {...size} className="" />
          </section>
          <section className="h-screen background-full  ">
            <Program {...size} className="flex justify-center" />
          </section>
          <section className="h-screen ">
            <About {...size} className="flex justify-center" />
          </section>
        </>
      )}
    </div>
  );
}

export default hot(module)(App);
