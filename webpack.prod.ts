import * as path from 'path';

import webpack from 'webpack';
import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import common, { makeCssConfig } from './webpack.common';

export default merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].js',
    },
    module: {
        rules: [
            makeCssConfig(true),
        ],
    },
    stats: {
        assetsSort: '!size',
        performance: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
    ],
});
