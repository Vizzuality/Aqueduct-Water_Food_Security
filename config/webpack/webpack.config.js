require('dotenv').config({ silent: true });

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV;

const config = {
  entry: [
    path.join(__dirname, '..', '..', 'src/main.jsx')
  ],

  output: {
    path: path.join(__dirname, '..', '..', 'dist/'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    publicPath: isProduction ? './' : '/'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          }
        },
        include: [
          path.join(__dirname, '..', '..', 'src'),
          path.join(__dirname, '..', '..', 'lib'),
          path.join(__dirname, '..', '..', 'node_modules', 'camelcase'),
          path.join(__dirname, '..', '..', 'node_modules', 'camelcase-keys'),
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.(eot|ttf|woff2|woff)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              context: '/src/fonts'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            prefix: 'image/',
            limit: '5000',
            context: '/src/images'
          }
        }
      }
    ]
  },

  resolve: {
    alias: {
      'aqueduct-components': path.resolve(__dirname, '..', '..', 'node_modules', 'aqueduct-components', 'lib'),
      actions: path.resolve(__dirname, '..', '..', 'src', 'actions'),
      components: path.resolve(__dirname, '..', '..', 'src', 'components'),
      containers: path.resolve(__dirname, '..', '..', 'src', 'containers'),
      constants: path.resolve(__dirname, '..', '..', 'src', 'constants'),
      utils: path.resolve(__dirname, '..', '..', 'src', 'utils'),
      selectors: path.resolve(__dirname, '..', '..', 'src', 'selectors'),
      reducers: path.resolve(__dirname, '..', '..', 'src', 'reducers'),
      services: path.resolve(__dirname, '..', '..', 'src', 'services'),
      main: path.resolve(__dirname, '..', '..', 'src', 'main'),
      routes: path.resolve(__dirname, '..', '..', 'src', 'routes'),
      data: path.resolve(__dirname, '..', '..', 'src', 'data')
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.scss']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      config: {
        API_URL: JSON.stringify(process.env.API_URL),
        BITLY_LOGIN: JSON.stringify(process.env.BITLY_LOGIN),
        BITLY_KEY: JSON.stringify(process.env.BITLY_KEY),
        GOOGLE_ANALYTICS: JSON.stringify(process.env.GOOGLE_ANALYTICS)
      }
    })
  ]
};

module.exports = config;
