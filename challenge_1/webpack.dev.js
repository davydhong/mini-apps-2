const path = require('path');
const webpack = require('webpack');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
const DIST_DIR = path.join(__dirname, '/public');
const SRC_DIR = path.join(__dirname, '/client/src');

module.exports = {
  mode: 'development',

  context: __dirname,
  entry: ['./client/src/index.jsx', hotMiddlewareScript],
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js(x)?/,
        include: SRC_DIR,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['react-hot-loader/babel']
          }
        }
      } /* ,
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader' // inject CSS to page
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function() {
                // post css plugins, can be exported to postcss.config.js
                return [require('precss'), require('autoprefixer')];
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      } */
    ]
  },
  devtool: '#source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
