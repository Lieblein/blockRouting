/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const webpackMerge = require('webpack-merge');

const ENV = 'development';

const commonConfig = require('./webpack.common.js')({ env: ENV });
// uncomment if you want to see configs merge result
// const helpers = require('./helpers');

const config = webpackMerge.smart(commonConfig, {
    module: {
        rules: [
            {
                test: /\.p?css$/,
                use: [
                    'style-loader?sourceMap=true',
                    'css-loader?sourceMap=true',
                    'postcss-loader?sourceMap=true'
                ]
            }
        ]
    }
});

// uncomment if you want to see configs merge result
// helpers.writeJSON(config);

module.exports = config;
