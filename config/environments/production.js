const path = require('path');
const express = require('express');
const webpack = require('webpack');

const indexPath = path.join(process.cwd(), 'dist/index.html');

module.exports = (app) => {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      dead_code: true,
      drop_debugger: true,
      drop_console: true
    },
    comments: false
  }));
  app.use(express.static(path.join(process.cwd(), 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(indexPath);
  });
};
