const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].[contenthash].min.js',
  },
  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '/dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      {        
        test: /\.jsx?/,        
        exclude: /node_modules/,        
        use: ['babel-loader'],      
      },
      {
        test: /\.css$/,
        use: [
          { 
            loader: 'style-loader',
          },
          { 
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            }, 
          },
        ],
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: './src/template.html',
      favicon: './src/assets/images/favicon.png',
      filename: 'index.html', // output file
    }),
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
};
