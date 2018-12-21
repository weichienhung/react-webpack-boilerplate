const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      },
      // {
      //   loader: 'image-webpack',
      //   options: {
      //     query: {
      //       mozjpeg: {
      //         progressive: true,
      //       },
      //       gifsicle: {
      //         interlaced: true,
      //       },
      //       optipng: {
      //         optimizationLevel: 7,
      //       }
      //     }
      //   }
      // }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src/'),
      path.resolve(__dirname, 'node_modules/'),
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: "./index.html"
    })
  ],
  devServer: {
    compress: true,
  }
};

module.exports = config;
