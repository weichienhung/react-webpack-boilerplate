const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'app');
const env = process.env.NODE_ENV;

const config = {
  entry: {
    bundle: [
      'babel-polyfill',
      'react-hot-loader/patch',
      `${APP_DIR}/index.jsx`],
    vendors: ['react', 'react-dom', 'prop-types']
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/build/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: ['babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: ['style', 'css']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file',
            options: {
              query: {
                hash: 'sha512',
                digest: 'hex',
                name: 'name=[hash].[ext]'
              }
            }
          },
          {
            loader: 'image-webpack',
            options: {
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: true,
                },
                optipng: {
                  optimizationLevel: 7,
                }
              }
            }
          }
        ]
      }
    ]
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    contentBase: './',
    disableHostCheck: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js' }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

module.exports = config;
