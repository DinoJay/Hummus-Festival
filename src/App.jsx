import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';

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
    <div ref={ref} className="flex flex-col justify-center items-center">
      {size && (
        <>
          <div className="h-screen flex flex-col justify-center border p-1 background-0">
            <Landing {...size} className="flex flex-col items-center " />
          </div>
          <div className="h-screen border p-1">
            <MissionStatement {...size} className="flex justify-center" />
          </div>
          <div className="h-screen border p-1 bacground-0">
            <Circle {...size} className="" />
          </div>
          <div className="h-screen border p-1">
            <Program {...size} className="flex justify-center" />
          </div>
          <div className="h-screen border p-1">
            <About {...size} className="flex justify-center" />
          </div>
        </>
      )}
    </div>
  );
}

export default hot(module)(App);
