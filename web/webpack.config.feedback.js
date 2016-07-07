var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var webpackConfig = Object.create(baseConfig);
webpackConfig.entry = [
    path.resolve(__dirname, 'feedback/src/entry.js'),
    'webpack-hot-middleware/client?reload=true'
];
webpackConfig.output = {
    filename: "index.js",
    path: path.resolve(__dirname, 'feedback/build/'),
    publicPath: 'http://localhost:8080/build/'
};

module.exports = webpackConfig;
