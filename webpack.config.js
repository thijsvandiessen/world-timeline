const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackIndexHTMLPlugin = require('@open-wc/webpack-index-html-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.html'),
  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    }]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new WebpackIndexHTMLPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};

