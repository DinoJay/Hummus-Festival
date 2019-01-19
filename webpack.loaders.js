const path = require('path');

const devMode = true; // process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const alias = require('./alias');

module.exports = [
  {
    test: /\.scss$/,
    exclude: [/[/\\]components[/\\]/, /[/\\](node_modules)[/\\]/],
    use: [
      devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      // MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ]
  },

  {
    test: /\.scss$/,
    include: /[/\\](components)[/\\]/,
    exclude: /[/\\](node_modules)[/\\]/,
    loaders: [
      devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      // MiniCssExtractPlugin.loader,
      'css-loader?modules&importLoaders=true&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
      'postcss-loader',
      'sass-loader'
    ]
  },
  {
    // global css
    test: /\.css$/,
    // include: /[/\\]node_modules[/\\]/,
    // include: /[\/\\](globalStyles)[\/\\]/,
    exclude: /[/\\](node_modules)[/\\]/,
    loaders: [
      devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      // MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader'
    ],
  },
  {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'babel-loader?cacheDirectory=true',
    exclude: /(node_modules|bower_components|public)/,
  },
  {
    enforce: 'pre',
    test: /\.jsx$/,
    use: ['babel-loader?cacheDirectory=true'],
    exclude: /(node_modules|bower_components|public)/,
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    // exclude: /(node_modules|bower_components)/,
    include: path.join(__dirname, 'node_modules/font-awesome'),
    loader: 'file-loader',
  },
  {
    test: /\.(woff|woff2)$/,
    // exclude: /(node_modules|bower_components)/,
    // include: `${path.dirname()}/node_modules/font-awesome`,
    include: path.join(__dirname, 'node_modules/font-awesome'),
    loader: 'url-loader?prefix=font/&limit=5000',
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    // exclude: /(node_modules|bower_components)/,
    // include: `${path.dirname()}/node_modules/font-awesome`,
    // include: path.join(__dirname, 'src'),
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    // include: re,
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
  },
  {
    test: /\.gif/,
    exclude: /(node_modules|bower_components)/,
    // include: `${path.dirname()}/node_modules/font-awesome`,
    include: path.join(__dirname, 'node_modules/font-awesome'),
    loader: 'url-loader?limit=10000&mimetype=image/gif',
  },
  {
    test: /\.jpg/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=image/jpg',
  },
  {
    test: /\.png/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=image/png',
  },
  {
    test: /\.csv/,
    exclude: /(node_modules|bower_components)/,
    loader: 'dsv-loader',
  },
];
