const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;
const PROXY = 'http://' + HOST + ':8080/';

module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: './dist',
    filename: 'app.bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.pug$/, loader: 'pug'},
      { test: /\.(ttf|eot|woff2?|svg)$/, loader: 'file?name=/fonts/[name].[ext]' },
      { test: /\.png$/, loader: 'file?name=/images/[name].[ext]' },
      { test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },
      { test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract(
        'style', ['css?sourceMap', 'sass?sourceMap'])}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/views/index.pug'
    }),
    new ExtractTextPlugin('styles/app.css', {
      allChunks : true
    }),
    new BrowserSyncPlugin({
      host: HOST,
      port: PORT,
      server: { baseDir: ['dist'] }
    })
  ]
};

