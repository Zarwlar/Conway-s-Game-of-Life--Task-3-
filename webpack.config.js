var path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/app.js'],
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
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/,/app.js/],
                use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015'] },
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx']
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