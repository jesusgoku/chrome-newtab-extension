const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/main.js'
    },
    output: {
        path: './build/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loaders: ['json']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js'),
        new ExtractTextPlugin('[name].css')
    ]
};
