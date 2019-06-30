import Search from 'react-feather/dist/icons/search';
import posed from 'react-pose';

import useMeasure from './useMeasure';

import React, {useState, useMemo, useEffect} from 'react';

export default function Description(props) {
  const {children, height, className, more, extendable} = props;
  const [extended, setExtended] = useState(false);
  const [bind, dim] = useMeasure();
  console.log('dim', dim);
  return (
    <div className="flex flex-col z-20">
      <div
        className="flex-grow relative flex flex-col px-4 mb-2 speech-bubble bg-white"
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
          <div {...bind} className="relative flex-shrink overflow-hidden md:text-xl">
            {children}
          </div>
        </div>
        {!extended && extendable && (
          <button
            type="button"
            onClick={() => setExtended(!extended)}
            className="mb-3 ml-3 mr-1 invisible-btn absolute right-0 bottom-0 flex-shrink-0 flex">
              <Search />
          </button>
        )}
      </div>
    </div>
  );
}
