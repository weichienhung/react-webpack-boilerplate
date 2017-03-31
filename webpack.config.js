var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'app');
var env = process.env.NODE_ENV;

var config = {
  // entry: APP_DIR + '/index.jsx',
  entry: {
    bundle: [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server',
      APP_DIR + '/index.jsx' ],
    vendors: ['react', 'moment']

  },
  output: {
    path: BUILD_DIR,
    publicPath: "/build/",
    filename: '[name].js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.(scss|css)$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js','.jsx']
  },
  plugins : [
    new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

module.exports = config;
