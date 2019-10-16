const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(process.cwd(), 'dist'),
    // publicPath: '/'
  },
  devtool: '#eval-source-map',
  devServer: {
    contentBase: path.resolve(process.cwd(), 'public'),
    port: 3000,
    // host: '0.0.0.0',
    historyApiFallback: true
  },
  plugins: [new webpack.NamedModulesPlugin()],
  performance: {
    hints: false
  },
  stats: { colors: true }
});
