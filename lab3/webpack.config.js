const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');



const generateTemplates = () => {
    const directopyPath = './src/pages/';
    const paths = fs.readdirSync(directopyPath);
    return paths.map(path => new HtmlWebpackPlugin({template : `${directopyPath}${path}`, filename: path}));
}

generateTemplates();

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
        new CopyWebpackPlugin([{
        from : "./src/assets/",
        to : "./assets/",
        }]),
        ...generateTemplates(),
        new WriteFileWebpackPlugin()
  ]
};