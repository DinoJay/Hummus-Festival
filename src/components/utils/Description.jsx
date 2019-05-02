import Sunset from 'react-feather/dist/icons/sunset';
import posed from 'react-pose';

import React, {useState, useMemo, useEffect} from 'react';

const Extendable = posed.div({
  closed: {
    height: 'auto',
    // height: 70
    // width: 70
  },
  open: {
    // y: ({height}) => height / 2,
    height: '75vh'
    // width: '100%'
  }
});

export default function Description(props) {
  const {children, className} = props;
  const [extended, setExtended] = useState(false);
  return (
    <div className={`${className} z-20`}>
      <div
        className="flex-grow flex flex-col px-4 mb-10 speech-bubble bg-white"
        style={
          {
            // boxShadow: '5px 7px'
          }
        }>
        <Extendable
          className="flex flex-col overflow-hidden h-32"
          pose={extended ? 'open' : 'closed'}>
          <div
            className="flex-shrink overflow-hidden"
            style={{maxHeight: !extended && '10rem'}}>
            {children}
          </div>
          <button
            className="flex-no-shrink mt-auto m-1"
            type="button"
            onClick={() => setExtended(!extended)}>
            <Sunset />
          </button>
        </Extendable>
      </div>
    </div>
  );
}
