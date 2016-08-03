var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Postcss plugins
var postcssImport = require('postcss-import');
var postcssNested = require('postcss-nested');
var autoprefixer = require('autoprefixer');

var webpackConfig = {
    entry: path.resolve(__dirname, 'src/index.js'),
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
                loader: ExtractTextPlugin.extract('style-loader', "css-loader?modules!postcss-loader"),
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
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
            },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=65000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=65000&mimetype=application/octet-stream]" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=65000&mimetype=application/vnd.ms-fontobject" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=65000&mimetype=image/svg+xml" }
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
if (process.env.NODE_ENV === 'production') {
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
        new HtmlWebpackPlugin({
            title: 'Qustom',
            template: path.resolve(__dirname, 'assets/html/index.html'),
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ];
} else {
    webpackConfig.devtool = "source-map";
    webpackConfig.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("styles.css", { allChunks: true }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        })
    ];
}

module.exports = webpackConfig;
