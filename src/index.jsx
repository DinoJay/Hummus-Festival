import React from 'react';
// import {AppContainer} from 'react-hot-loader';
import ReactDOM from 'react-dom';

import WebFont from 'webfontloader';
import App from './App';

import './styles/tailwind.css';
import './styles/index.scss';

const WebFontConfig = {
  google: {
    families: ['Cabin Sketch', 'Annie Use Your Telescope']
  }
};

WebFont.load(WebFontConfig);

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('app'));
};

render(App);
