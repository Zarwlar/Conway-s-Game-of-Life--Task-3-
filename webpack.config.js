var path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/app.js'],
    output: {
        path: __dirname + '/public',
        filename: 'app.js'
    },
    module: {
        rules: [{
                test: /\.tsx?$/i,
                use: 'ts-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx']
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