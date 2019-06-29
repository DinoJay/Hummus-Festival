import React from 'react';
// import {AppContainer} from 'react-hot-loader';
import ReactDOM from 'react-dom';

import WebFont from 'webfontloader';
import App from './App';


import '../css/style.css';
// import './styles/tailwind.css';
import './styles/index.scss';

const WebFontConfig = {
  google: {
    families: ['Cabin Sketch', 'Annie Use Your Telescope']
  }
};

WebFont.load(WebFontConfig);

export default App;
