import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';

import {hot} from 'react-hot-loader';

import NavRing from './NavRing';
import Landing from './Landing';

function App() {
  const [size, setSize] = useState(null);

  const ref = React.useRef();
  const maxWidth = 700;
  const maxHeight = 700;
  useEffect(() => {
    const resize = () => {
      const width = Math.min(window.innerWidth, maxWidth);
      const height = Math.min(window.innerHeight, maxHeight);
      console.log('resize', width, height);

      const circleWidth = width - width / 3;

      setSize({
        width,
        height,
        circleWidth,
      });
    };

    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div ref={ref} className="flex flex-col justify-center items-center">
      <div className="h-screen flex flex-col justify-center border p-1">
        {size !== null && <Landing {...size} className="flex justify-center" />}
      </div>
      <div className="h-screen border p-1">
        {size !== null && <NavRing {...size} className="flex justify-center" />}
      </div>
    </div>
  );
}

export default hot(module)(App);
