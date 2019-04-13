import * as path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import WebpackBar from 'webpackbar';

const amesEndpoint = process.env.AMES_ENDPOINT || 'https://ames.tirr.dev/graphql';
const amesStatics = process.env.AMES_STATICS || 'https://ames-static.tirr.dev';

const config: webpack.Configuration = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(graphql|gql)$/,
                use: 'graphql-tag/loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new webpack.DefinePlugin({
            AMES_ENDPOINT: JSON.stringify(amesEndpoint),
            AMES_STATICS: JSON.stringify(amesStatics),
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '프리코네R 퀘스트 시뮬레이터',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
        }),
        new WebpackBar(),
    ],
    stats: {
        all: false,
        assets: true,
        assetsSort: 'id',
        errors: true,
        errorDetails: true,
        hash: true,
        moduleTrace: true,
        version: true,
        warnings: true,
        warningsFilter: 'size limit',
    },
    devtool: 'inline-source-map',
};

export function makeCssConfig(isProduction: boolean) {
    return {
        test: /\.css$/,
        use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    camelCase: true,
                    importLoaders: 1,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: () => [postcssPresetEnv()],
                },
            },
        ],
    };
}

export default config;
