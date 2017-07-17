/* eslint camelcase:0 */
require('dotenv').config({ silent: true });

process.env.BROWSERSLIST_CONFIG = 'browserslist';

const path = require('path');
const validate = require('webpack-validator');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const rootPath = process.cwd();
const componentsPath = path.join(rootPath, '..', 'aqueduct-components');

const config = {

  entry: [
    path.join(rootPath, 'src/main.jsx')
  ],

  output: {
    path: path.join(rootPath, 'dist/'),
    filename: '[name]-[hash].js',
    publicPath: '/'
  },

  externals: {
    leaflet: 'L'
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        include: [
          path.join(rootPath, 'src')
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'style-loader!css-loader!sass-loader!postcss-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(eot|ttf|woff2|woff)$/,
        loader: 'url-loader?prefix=fonts/&context=/src/fonts'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?prefix=image/&limit=5000&context=/src/images'
      }
    ]
  },

  resolve: {
    root: [
      path.join(rootPath, 'src')
    ],
    modulesDirectories: [
      path.resolve(componentsPath, 'node_modules'),
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
    alias: {
      icons: path.resolve(componentsPath, 'src', 'icons')
    }
  },

  resolveLoader: {
    root: [
      path.join(rootPath, 'node_modules')
    ]
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
      config: {
        API_URL: JSON.stringify(process.env.API_URL),
        BASEMAP_TILE_URL: JSON.stringify(process.env.BASEMAP_TILE_URL),
        BASEMAP_LABEL_URL: JSON.stringify(process.env.BASEMAP_LABEL_URL),
        BITLY_LOGIN: JSON.stringify(process.env.BITLY_LOGIN),
        BITLY_KEY: JSON.stringify(process.env.BITLY_KEY),
        opbeatOrgId: JSON.stringify(process.env.OPBEAT_ORGID),
        opbeatAppId: JSON.stringify(process.env.OPBEAT_APPID)
      }
    })
  ]

};

module.exports = validate(config);
