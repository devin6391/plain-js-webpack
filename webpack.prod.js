var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const sourceFolder = "src";
const distFolder = "dist";

let extractCSS = new ExtractTextPlugin(path.join(distFolder, "[name]-[contenthash].css"));

module.exports = {
	entry: {
		"babel-polyfill": "babel-polyfill",
		// "index": path.join(__dirname, sourceFolder, "index.js"),
		"app-shell": path.join(__dirname, sourceFolder, "app-shell.js"),
		"custom-jq": path.join(__dirname, sourceFolder, "common", "scripts", "custom-jq.js")
	},
	devtool: 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, distFolder),
		publicPath: '',
		filename: '[name]-[chunkhash].js'
	},
	module: {
		rules: [
		// 	{
		// 	test: /\.css$/,
		// 	use: extractCSS.extract({
		// 		fallback: 'style-loader',
		// 		use: 'css-loader'
		// 	})
		// },
		 {
			test: /\.(jpe?g|png|gif|svg)$/i,
			use: 'file-loader?name=../../images/[name].[ext]'
		}, {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}
		}]
	},
	plugins: [
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
		// extractCSS,
		new HtmlWebpackPlugin({
			template: path.join(__dirname, sourceFolder, "index.html"),
			inject: true,
			minify: {
				collapseWhitespace: true,
				removeComments: true
			},
			excludeChunks: ['custom-jq'],
			filename: path.join(__dirname, distFolder, "index.html"),
			inlineSource: '(index)(\.js)',
		}),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'async'
		}),
		// new ExtractTextPlugin(path.join("common", "styles", "[name]-[contenthash].css")),
		new FaviconsWebpackPlugin({
			// Your source logo
			logo: path.join(__dirname, sourceFolder, "images", "logo_JavaScript.png"),
			// The prefix for all image files (might be a folder or a name)
			prefix: 'icons-[hash]/',
			// Emit all stats of the generated icons
			emitStats: false,
			// The name of the json containing all favicon information
			statsFilename: 'iconstats-[hash].json',
			// Generate a cache file with control hashes and
			// don't rebuild the favicons until those hashes change
			persistentCache: true,
			// Inject the html into the html-webpack-plugin
			inject: true,
			// favicon background color (see https://github.com/haydenbleasel/favicons#usage)
			background: '#fff',
			// favicon app title (see https://github.com/haydenbleasel/favicons#usage)
			title: 'VanillaJS-webpack App',

			// which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: false
			}
		}),
		new CopyWebpackPlugin([{
			from: path.join(__dirname, sourceFolder, "images"),
			to: path.join(__dirname, distFolder, "images")
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
