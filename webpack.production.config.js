const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const loaders = require('./webpack.loaders');

const apiTokens = require('./api-keys.json');

const alias = require('./alias');

// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    // TODO
    // TODO
    // TODO
    // 'babel-polyfill',
    './src/index.jsx', // your app's entry point
  ],
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[contenthash].bundle.css',
    // publicPath: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias
  },
  module: {
    rules: loaders,
  },
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: false,
  //       parallel: true,
  //       uglifyOptions: {
  //         compress: false,
  //         ecma: 6,
  //         mangle: {safari10: true},
  //       },
  //       sourceMap: false,
  //     }),
  //   ],
  // },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: '[name].css',
      // chunkFilename: '[id].css'
      // filename: '[name].[hash].css',
      // chunkFilename: '[id].[hash].css',
      filename: 'style.css'
    }),
    new CleanWebpackPlugin(['dist/*.*']),

    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.EnvironmentPlugin(apiTokens),
  ],
};
