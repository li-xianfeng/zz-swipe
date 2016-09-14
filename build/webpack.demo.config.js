var HtmlWebpackPlugin = require('html-webpack-plugin')
var options = require('./webpack.base.js');

options.entry = __dirname + '/../demo/index.js';
options.output = {
  filename: __dirname + '/../demo/dist/app.js',
  publicPath: 'http:localhost:8080'
};
module.exports = options;