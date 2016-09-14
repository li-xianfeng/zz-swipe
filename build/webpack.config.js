/*eslint-env node */
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
var options = require('./webpack.base.js');
options.entry = __dirname + '/../src/index.js';
options.output = {
  filename: 'zzswipe.js',
  path: __dirname + '/../dist',
  library: 'Swipe',
  libraryTarget: 'umd'
};
module.exports = options;