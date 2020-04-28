const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: [
    './src/index.ts',
  ],
  output: {
    filename: './js/app.bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [
    {
        test : /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },
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
    extensions: [ '.ts', '.js' ],
  },
  plugins : [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({filename : "./css/main.css"}),
      new HtmlWebpackPlugin({
        template : "./src/index.html"
      })
  ]
};