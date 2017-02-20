var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const sourceFolder = "src";
const distFolder = "static";

module.exports = {
	entry: {
		"babel-polyfill": "babel-polyfill",
		"unifiedLogin": path.join(__dirname, sourceFolder, "unified-login.js"),
		"mOnly": path.join(__dirname, sourceFolder, "m-only.js"),
		"mOnlyLogin": path.join(__dirname, sourceFolder, "m-only-login.js"),
		"fc-jq": path.join(__dirname, sourceFolder, "assets", "scripts", "fc-jq.js")
	},
	devtool: 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, distFolder),
		publicPath: '',
		filename: '[name]-[chunkhash].js'
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
			loader: 'file-loader?name=../images/[name].[ext]'
		}, {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015']
			}
		}]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new CommonsChunkPlugin("commons.chunk.js"),
		new webpack.EnvironmentPlugin([
			'NODE_ENV'
		]),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$/,
			threshold: 10240,
			minRatio: 0.8
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, sourceFolder, "unified-login.html"),
			inject: true,
			minify: {
				collapseWhitespace: true,
				removeComments: true
			},
			excludeChunks: ['mOnly', 'mOnlyLogin', 'fc-jq'],
			filename: path.join(__dirname, distFolder, "unified-login.html")
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, sourceFolder, "m-only.html"),
			filename: path.join(__dirname, distFolder, "m-only.html"),
			inject: true,
			minify: {
				collapseWhitespace: true,
				removeComments: true
			},
			excludeChunks: ['unifiedLogin', 'mOnlyLogin', 'fc-jq'],
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, sourceFolder, "m-only-login.html"),
			filename: path.join(__dirname, distFolder, "m-only-login.html"),
			inject: true,
			minify: {
				collapseWhitespace: true,
				removeComments: true
			},
			excludeChunks: ['unifiedLogin', 'mOnly', 'fc-jq'],
		}),
		new ExtractTextPlugin(path.join("assets", "styles", "[name]-[contenthash].css")),
		new CopyWebpackPlugin([{
			from: path.join(__dirname, sourceFolder, "assets", "images"),
			to: path.join(__dirname, distFolder, "assets", "images")
		}, ]),
		new UglifyJsPlugin({
			beautify: false,
			output: {
				comments: false
			},
			mangle: {
				screw_ie8: true
			},
			compress: {
				screw_ie8: true,
				warnings: false,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
				negate_iife: false
			},
		}),
	],
};
