const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const minify = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts.js'
    },
    module: {
        rules: [
            {
                test:/.(s*)css$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            }
        ]
    },
    optimization: {
        minimizer: [
            new minify({})
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            cache: false,
            minify:{
                removeAttributeQuotes:true,
                collapseWhitespace:true
            },
            hash:true
        }),
        new miniCss({
            filename: './style.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets'
                }
            ]
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        // compress: true,
        port: 9000,
    },
};
