import Sunset from 'react-feather/dist/icons/sunset';
import posed from 'react-pose';

import React, {useState, useMemo, useEffect} from 'react';

const Extendable = posed.div({
  exit: {opacity: '0'},
  closed: {
    height: ({height = '8rem'}) => height
    // height: 70
    // width: 70
  },
  open: {
    // y: ({height}) => height / 2,
    height: 'auto'
    // width: '100%'
  }
});

export default function Description(props) {
  const {children, className} = props;
  const [extended, setExtended] = useState(false);
  return (
    <div className={`${className} flex flex-col z-20`}>
      <div
        className="flex-grow flex flex-col px-4 mb-2 speech-bubble bg-white"
        style={
          {
            // boxShadow: '5px 7px'
          }
        }>
        <Extendable
          onClick={() => setExtended(!extended)}
          className="flex flex-grow flex-col overflow-hidden h-32"
          pose={extended ? 'open' : 'closed'}>
          <div className="flex-shrink overflow-hidden md:text-2xl">
            {children}
          </div>
          <button
            className="flex-no-shrink mt-auto m-1 border-t-2 "
            type="button">
            More...
          </button>
        </Extendable>
      </div>
    </div>
  );
}
