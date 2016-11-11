const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {

  context: path.join(__dirname, 'src'),

  entry: [
    './app.jsx'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },

      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'style-loader!css-loader!sass-loader!postcss-loader'
      }
      // {test: /\.otf$/, loader: 'file-loader?name=fonts/[name].[ext]'},
      // {test: /\.(png|jpg|gif|svg)$/,
      // loader: 'url-loader?prefix=image/&limit=5000&context=./src/images'}
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', 'css', '.scss']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({})
  ]

};

// Environment configuration
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      dead_code: true,
      drop_debugger: true,
      drop_console: true
    },
    comments: false
  }));
} else {
  config.devtool = 'eval-source-map';
}

module.exports = config;
