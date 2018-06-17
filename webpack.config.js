const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


const SRC = 'src';
const BUILD = 'dist';

const config = {
    context: path.resolve(__dirname, SRC),
    entry: {
        background: './app/main/background.js',
        options: './app/main/options.js'
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
        new ExtractTextPlugin('assets/css/app.css'),
        new CopyWebpackPlugin([
            {from:'./app/assets/icons',to:'./assets/icons/'} 
        ]),
        new CopyWebpackPlugin([
            {from:'./app/manifest.json',to:'./'} 
        ]), 
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

        new HtmlWebpackPlugin({
            template :'./app/templates/options.html',
            excludeAssets: [/background.*.js/],
            // chunks : ['jquery','angular','app'],
            filename: "./options.html",
            cache : true
          }),
          new HtmlWebpackExcludeAssetsPlugin(),

          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          })
          
        // new UglifyJSPlugin({ test: /\.js($|\?)/i }),
    ]

};
module.exports = config