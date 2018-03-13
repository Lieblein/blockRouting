/* eslint import/no-extraneous-dependencies: 0 */

const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');

const helpers = require('./helpers');
const WEBPACK_TEMPLATE_COMMON = require('./webpack.common');

const BUILD_PATH = './build/';

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = `commonjs ${mod}`;
    });

let webpackConfig = merge.smart(
    WEBPACK_TEMPLATE_COMMON,
    {
        target: 'node',
        node: {
            __filename: true,
            __dirname: true
        },
        entry: [helpers.root('src', 'server', 'server.js')],
        output: {
            path: helpers.root(BUILD_PATH),
            publicPath: '/',
            filename: 'server.js'
        },
        externals: nodeModules,
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop')
        ]
    }
);

module.exports = webpackConfig;
