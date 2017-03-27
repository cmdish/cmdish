const webpack = require("webpack");
const path = require("path");

const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DotenvPlugin = require("webpack-dotenv-plugin");

module.exports = {
    devtool: "source-map",
    entry: {
        app: [
            "babel-polyfill",
            "react-hot-loader/patch",
            "./src/index"
        ]
    },
    output: {
        path: path.resolve("./_dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }
                })
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.SourceMapDevToolPlugin(),
        new webpack.optimize.UglifyJsPlugin()
        new DotenvPlugin({
            path: "./.env",
            sample: "./.env.example"
        }),
        new ExtractTextPlugin("style.css"),
        new HtmlWebpackPlugin({
            title: "cmdish",
            template: "index.ejs",
            hash: true
        })
    ]
}
