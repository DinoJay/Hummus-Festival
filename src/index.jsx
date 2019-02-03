import React from 'react';
// import {AppContainer} from 'react-hot-loader';
import ReactDOM from 'react-dom';

import WebFont from 'webfontloader';
import App from './App';

import './styles/tailwind.css';
import './styles/index.scss';

const WebFontConfig = {
  google: {
    families: ['Roboto', 'Cabin Sketch', 'Concert One', 'Slackey', 'Bowlby One SC']
  }
};

WebFont.load(WebFontConfig);

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('app'));
};

render(App);
