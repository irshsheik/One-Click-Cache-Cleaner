const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


const SRC = 'src';
const BUILD = 'dist';

const config = {
    context: path.resolve(__dirname, SRC),
    entry: {
        background: './app/main/background.js',
        /** init-comment */
        // app : './app/app.module.js'
        // vendor: to be added 
    },
    output: {
        path: path.resolve(__dirname, BUILD),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /src.*\.js$/,
                include: path.resolve(__dirname, SRC),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                //similarly for css without sass loader
                test: /\.(scss)$/,
                include: path.resolve(__dirname, 'src'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: "css-loader", options: { sourceMap: true } },
                        { loader: "postcss-loader", options: { sourceMap: true } },
                        { loader: "sass-loader", options: { sourceMap: true } }
                    ]
                })
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: "css-loader", options: { sourceMap: true } },
                        { loader: "postcss-loader", options: { sourceMap: true } }
                    ]
                })
            },
            {
                test: /\.(jp(e*)g|svg)$/,
                include: path.resolve(__dirname, SRC),
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash].[ext]',
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.png$/,
                include: path.resolve(__dirname, SRC),
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000 ,
                        name: '[name].[ext]',
                        outputPath: 'icons/'
                    } // Convert images < 100k to base64 strings

                }]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        /** init-comment */
        // new ExtractTextPlugin('assets/css/app.css'),
        new CopyWebpackPlugin([
            {from:'./app/assets/icons',to:'./assets/icons/'} 
        ]),
        new CopyWebpackPlugin([
            {from:'./app/manifest.json',to:'./'} 
        ]), 
       /** init-comment */
        // new CopyWebpackPlugin([
        //     {from:'./app/templates',to:'./templates'} 
        // ]),
       /** init-comment */
        // new HtmlWebpackPlugin({
        //     title : 'Advanced Bookmark Manager',
        //     template :'./app/app.html',
        //     chunks : ['jquery','angular','app'],
        //     filename: "./app.html",
        //     cache : true
        //   }),

        // new HtmlWebpackPlugin({
        //     title : 'Advanced Bookmark Manager',
        //     template :'./app/popup.html',
        //     chunks : ['jquery','angular','app'],
        //     filename: "./popup.html",
        //     cache : true
        //   }),

        //   new webpack.ProvidePlugin({ // inject ES5 modules as global vars
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery',      
        //     Tether: 'tether'
        //   })
        // new UglifyJSPlugin({ test: /\.js($|\?)/i }),
    ]

};
module.exports = config