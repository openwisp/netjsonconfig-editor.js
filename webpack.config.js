var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build/js/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: APP_DIR + '/js/index.js',
  output: {
    path: BUILD_DIR,
    publicPath: "/",
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: "/",
    contentBase: "./examples"
  },
  module : {
    loaders : [
      { 
        enforce: "pre",
        test: /\.jsx?$/,
        loader: 'eslint-loader', 
        exclude: /node_modules/ ,
        options: {
          failOnWarning: false,
          failOnError: true,
          fix: true
        }
      },
      {
        test : /\.jsx?/,
        include : APP_DIR+"/js/",
        loader : 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      }
    ]
  }
};

module.exports = config;
