const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'app');
const env = process.env.NODE_ENV;

const replaceInFile = (srcPath, dstPath, toReplace, replacement) => {
  const replacer = (match) => {
    console.log('Replacing %s => %s', match, replacement);
    return replacement;
  };
  const str = fs.readFileSync(srcPath, 'utf8');
  const out = str.replace(new RegExp(toReplace, 'g'), replacer);
  fs.writeFileSync(dstPath, out);
};


const config = {
  devtool: 'source-map',
  entry: {
    bundle: [`${APP_DIR}/index.jsx`],
    vendors: ['react', 'moment']
  },
  output: {
    path: BUILD_DIR,
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        use: ['react-hot', 'babel'],
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: ['css', 'sass']
        })
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
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors-[hash].js' }),
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
      this.plugin('done', (stats) => {
        const hash = stats.hash; // Build's hash, found in `stats` since build lifecycle is done.
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
