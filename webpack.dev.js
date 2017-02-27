var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const sourceFolder = "src";
const distFolder = "dist";
const nodeFolder = "node_modules"

module.exports = {
	entry: {
		"babel-polyfill": "babel-polyfill",
		"unifiedLogin": path.join(__dirname, sourceFolder, "unified-login.js"),
		"mOnly": path.join(__dirname, sourceFolder, "m-only.js"),
		"mOnlyLogin": path.join(__dirname, sourceFolder, "m-only-login.js"),
		"custom-jq": path.join(__dirname, sourceFolder, "common", "scripts", "custom-jq.js")
	},
	devtool: 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, distFolder),
		publicPath: '',
		filename: '[name]-[hash].js'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loader: 'file-loader?name=../../images/[name].[ext]'
		}, {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015']
			}
		}, ]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new CommonsChunkPlugin("commons.chunk.js"),
		new webpack.EnvironmentPlugin([
			'NODE_ENV'
		]),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, sourceFolder, "unified-login.html"),
			inject: true,
			excludeChunks: ['mOnly', 'mOnlyLogin', 'custom-jq'],
			filename: path.join(__dirname, distFolder, "unified-login.html")
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, sourceFolder, "m-only.html"),
			filename: path.join(__dirname, distFolder, "m-only.html"),
			inject: true,
			excludeChunks: ['unifiedLogin', 'mOnlyLogin', 'custom-jq'],
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, sourceFolder, "m-only-login.html"),
			filename: path.join(__dirname, distFolder, "m-only-login.html"),
			inject: true,
			excludeChunks: ['unifiedLogin', 'mOnly', 'custom-jq'],
		}),
		new ExtractTextPlugin(path.join("common", "styles", "[name]-[contenthash].css")),
		new CopyWebpackPlugin([{
			from: path.join(__dirname, sourceFolder, "images"),
			to: path.join(__dirname, distFolder, "images")
		}, ]),
	],
	devServer: {
		port: PORT,
		host: HOST,
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	},
};
