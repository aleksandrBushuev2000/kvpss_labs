const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    filename: './js/app.bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [
    {
        test: /\.(sass|scss)$/,
        loaders : [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js' ],
  },
  plugins : [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({filename : "./css/main.css"}),
      new HtmlWebpackPlugin({
        template : "./src/pages/index.html"
      }),
      new CopyWebpackPlugin([{
          from : "./src/assets/",
          to : "./assets/",
      }]),
      new WriteFileWebpackPlugin()
  ],
};