var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');
var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'app');
var env = process.env.NODE_ENV;

var replaceInFile = function (srcPath, dstPath, toReplace, replacement) {
  var replacer = function (match) {
      console.log('Replacing %s => %s', match, replacement);
      return replacement
  };
  var str = fs.readFileSync(srcPath, 'utf8');
  var out = str.replace(new RegExp(toReplace, 'g'), replacer);
  fs.writeFileSync(dstPath, out);
};

var config = {
  devtool: 'source-map',
  entry: {
    bundle: [ APP_DIR + '/index.jsx' ],
    vendors: ['react', 'moment']
  },
  output: {
    path: BUILD_DIR,
    filename: '[name]-[hash].js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loaders: ['babel'],
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
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
    new webpack.optimize.CommonsChunkPlugin("vendors", "vendors-[hash].js"),
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: false,
        compress: {
            warnings: false
        }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    function() {
      this.plugin("done", function(stats) {
        var hash = stats.hash; // Build's hash, found in `stats` since build lifecycle is done.
        replaceInFile(path.join(__dirname, 'index.prd.template.html'),
          path.join(BUILD_DIR, 'index.html'),
          '\\[hash\\]',
          hash
        );
      });
    }
  ]
};

module.exports = config;
