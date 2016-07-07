var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var webpackConfig = Object.create(baseConfig);
webpackConfig.entry = [path.resolve(__dirname, 'src/index.js')];
webpackConfig.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: "survey.js"
};

module.exports = webpackConfig;
