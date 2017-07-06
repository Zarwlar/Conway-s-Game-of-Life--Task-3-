const path = require('path'),
 webpack = require('webpack'),
 HtmlWebpackPlugin = require('html-webpack-plugin'),
 ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ['./src/app.js'],
    output: {
        path: __dirname + '/public',
        filename: 'app.js'
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", 'stylus-loader']
                })
            },
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx']
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.pug',
            inject: 'body',
        }),
        new ExtractTextPlugin({
            filename: 'app.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}