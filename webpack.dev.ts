import * as path from 'path';

import webpack from 'webpack';
import merge from 'webpack-merge';

import common, { makeCssConfig } from './webpack.common';

export default merge(common, {
    mode: 'development',
    output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
    },
    module: {
        rules: [
            makeCssConfig(false),
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 3000,
        hot: true,
        stats: common.stats,
    },
});
