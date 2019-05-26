import Sunset from 'react-feather/dist/icons/sunset';
import posed from 'react-pose';

import React, {useState, useMemo, useEffect} from 'react';

const Extendable = posed.div({
  exit: {opacity: '0'},
  closed: {
    height: ({height}) => height || '8rem',
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
    <div className={`${className} flex flex-col z-20`}>
      <div
        className="flex-grow flex flex-col px-4 mb-2 speech-bubble bg-white"
        style={
          {
            // boxShadow: '5px 7px'
          }
        }>
        <Extendable
          height={height}
          onClick={() => setExtended(!extended)}
          className="flex flex-grow flex-col overflow-hidden "
          pose={extended ? 'open' : 'closed'}>
          <div className="flex-shrink overflow-hidden text-xl md:text-2xl">
            {children}
          </div>
          {more && (
            <div
              className="border-t-2
              mt-auto flex-shrink-0
              border-solid border-gray-500 m-1 p-1 flex ">
              <button className="btn-invisible m-auto text-xl" type="button">
                More...
              </button>
            </div>
          )}
        </Extendable>
      </div>
    </div>
  );
}
