const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    './src/index.ts',
  ],
  output: {
    filename: './app.bundle.js'
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
      {
        test: /\.html$/,
        loaders : [
            'html-loader'
        ]
      },
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  plugins : [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template : "./src/index.html"
      })
  ]
};