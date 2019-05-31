import Sunset from 'react-feather/dist/icons/sunset';
import posed from 'react-pose';

import React, {useState, useMemo, useEffect} from 'react';

const Extendable = posed.div({
  exit: {opacity: '0'},
  closed: {
    // height: ({height}) => height || '100%',
    // height: 70
    // width: 70
  },
  open: {
    // y: ({height}) => height / 2,
    height: 'auto',
    // width: '100%'
  },
});

export default function Description(props) {
  const {children, height, className, more} = props;
  const [extended, setExtended] = useState(false);
  return (
    <div className="flex flex-col z-20">
      <div
        className="flex-grow flex flex-col px-4 mb-2 speech-bubble bg-white"
        style={
          {
            // boxShadow: '5px 7px'
          }
        }>
        <div
          onClick={() => setExtended(!extended)}
          className={`flex ${
            extended ? 'max-h-half' : className
          } flex-grow flex-col overflow-y-auto `}
          style={{transition: 'all 500ms'}}>
          <div className="relative flex-shrink overflow-hidden text-xl md:text-2xl">
            {children}
            {more && !extended && (
              <div
                className="border-2 border-black
              absolute right-0 bottom-0 flex-shrink-0
              border-solid m-1 p-1 flex ">
                <button className="btn-invisible m-auto text-xl" type="button">
                  More...
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
