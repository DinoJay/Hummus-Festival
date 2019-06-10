import React, {useState, useEffect} from 'react';
import Facebook from 'react-feather/dist/icons/facebook';

// import scrollSnapPolyfill from 'css-scroll-snap-polyfill';

import {hot} from 'react-hot-loader';

import Circle from './Circle';
import Landing from './Landing';
import MissionStatement from './MissionStatement';
import Program from './Program';
import AuroraExpress from './AuroraExpress';
import People from './People';
import About from './About';

function App() {
  const [size, setSize] = useState(null);

  const ref = React.useRef();
  const maxWidth = 500;
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
    // window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  const {height = null, width = null} = size || {};
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
            <a
              href="https://www.facebook.com/estatefertile"
              className="triangle-btn md:triangle-lg-btn absolute top-0 right-0">
              <div className="relative w-full h-full">
                <div className="z-50 px-2 pb-3 right-0 top-0 absolute">
                  <Facebook className="fb-logo md:fb-lg-logo" color="white" />
                </div>
                <div className="triangle-right md:triangle-lg-right" />
              </div>
            </a>
            <Landing {...size} className="page flex flex-col justify-center" />
          </section>
          <section className="page background flex justify-center border-2  ">
            <MissionStatement {...size} className="flex " />
          </section>
          <section
            className="page flex justify-center background-0  "
            style={{minHeight: height}}>
            <Circle {...size} className="p-2" />
          </section>
          <section
            className="page background-full flex justify-center border-2"
            style={{height}}>
            <Program {...size} className="flex justify-center" />
          </section>
          <section
            className="page h-screen background-full flex justify-center border-2"
            >
            <AuroraExpress {...size} className="flex justify-center" />
          </section>
          <section
            className="page background-full border-2 flex justify-center "
            style={{minHeight: height}}>
            <People {...size} className="" />
          </section>
          <section
            className="page flex background justify-center border-2 "
            style={{height: 'unset'}}>
            <About {...size} className="" />
          </section>
        </>
      )}
    </div>
  );
}

export default hot(module)(App);
