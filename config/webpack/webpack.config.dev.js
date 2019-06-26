const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  devtool: '#eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 5000,
    host: '0.0.0.0',
    historyApiFallback: true
  },
  plugins: [new webpack.NamedModulesPlugin()],
  performance: {
    hints: false
  },
  stats: { colors: true }
});
