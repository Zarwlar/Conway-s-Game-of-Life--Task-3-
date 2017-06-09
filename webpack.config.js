var path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/app.ts'],
    output: {
        path: './public',
        filename: 'app.js'
    },
    module: {
        rules: [{
                test: /\.ts$/,
                include: path.resolve(__dirname, "src"),
                use: 'ts-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', 'js']
    },
    plugins: [new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            chunks: ['app'],
            filename: 'index.html',
            template: './src/index.pug'
        })
    ]
}