var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// Postcss plugins
var postcssImport = require('postcss-import');
var postcssNested = require('postcss-nested');
var autoprefixer = require('autoprefixer');

// ENV
var __PROD__ = process.env.NODE_ENV === 'production';
var __DEV__ = process.env.NODE_ENV === 'development';

var webpackConfig = {
    entry: [path.resolve(__dirname, 'src/index.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "survey.js"
    },
    module: {
        preLoaders: [
            {
                test: /\.js?$/,
                loader: 'eslint-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', "css-loader!postcss-loader"),
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        alias: {
            JSON: path.resolve(__dirname, 'json')
        }
    },
    postcss: function plugins(bundler) {
        return [
            postcssImport({
                addDependencyTo: bundler
            }),
            postcssNested,
            autoprefixer({ browsers: 'last 2 version' })
        ];
    }
};

// Plugins for different environment
if (__DEV__) {
    webpackConfig.plugins = [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("styles.css", { allChunks: true }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        })
    ];
} else if (__PROD__) {
    webpackConfig.plugins = [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin("styles.css", { allChunks: true }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ];
}

module.exports = webpackConfig;
