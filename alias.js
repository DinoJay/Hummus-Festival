const path = require('path');

module.exports = {
  Src: path.resolve(__dirname, './src'),
  Styles: path.resolve(__dirname, './src/styles'),
  Components: path.resolve(__dirname, 'src/components'),
  Constants: path.resolve(__dirname, 'src/constants'),
  Tailwind: path.resolve(__dirname, 'tailwind.config.js')
};
