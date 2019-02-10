import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';

import {hot} from 'react-hot-loader';

import NavRing from './NavRing';
import Landing from './Landing';

function App() {
  const [size, setSize] = useState({width: 100, height: 100});

  const contRef = React.createRef();
  const maxWidth = 700;
  const maxHeight = 700;
  useEffect(() => {
    const width = contRef.current.scrollWidth;
    const height = contRef.current.scrollHeight;
    console.log('width', width, 'height', height);
    setSize({
      width: Math.min(width, maxWidth),
      radius: Math.min(width, maxWidth) / 2,
      height: Math.min(height, maxHeight)
    });
  }, []);

  // console.log('size', size);

  return (
    <div ref={contRef} className="flex flex-col justify-center items-center">
      <div className="h-screen border p-1" style={{}}>
        <Landing {...size} className="flex justify-center" />
      </div>
      <div className="h-screen border p-1">
        <NavRing {...size} className="flex justify-center" />
      </div>
    </div>
  );
}

export default hot(module)(App);
