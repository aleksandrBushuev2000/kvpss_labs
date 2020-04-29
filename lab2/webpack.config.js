const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
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
        test: /\.css$/i,
        loaders : [
            MiniCssExtractPlugin.loader,
            'css-loader',
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js' ],
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