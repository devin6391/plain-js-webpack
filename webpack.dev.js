var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const sourceFolder = "src";
const distFolder = "dist";
const nodeFolder = "node_modules"

let extractCSS = new ExtractTextPlugin(path.join(distFolder, "[name]-[contenthash].css"));

module.exports = {
	entry: {
		"polyfills": path.join(__dirname, sourceFolder, "common", "scripts", "polyfills.js"),
		"app-shell": path.join(__dirname, sourceFolder, "app-shell.js"),
		"custom-jq": path.join(__dirname, sourceFolder, "common", "scripts", "custom-jq.js")
	},
	devtool: 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, distFolder),
		publicPath: '',
		filename: '[name]-[hash].js'
	},
	module: {
		rules: [
			// 	{
			// 	test: /\.css$/,
			// 	exclude: /(node_modules|bower_components)/,
			// 	use: extractCSS.extract([ 'css-loader', 'style-loader' ])
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
			},
			{
				test: /\.scss$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader"
				}, {
					loader: "sass-loader",
					options: {
						includePaths: ["absolute/path/a", "absolute/path/b"]
					}
				}]
			},
			{
	      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
	      use: "url-loader?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[ext]"
	    },
	    {
	      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
	      use: "url-loader?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[ext]"
	    },
	    {
	      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
	      use: "url-loader?limit=10000&mimetype=application/octet-stream&name=/fonts/[name].[ext]"
	    },
	    {
	      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
	      use: "file-loader?name=/fonts/[name].[ext]"
	    },
	    {
	      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
	      use: "url-loader?limit=10000&mimetype=image/svg+xml&name=/fonts/[name].[ext]"
	     }
		]
	},
	plugins: [
		new CommonsChunkPlugin("commons.chunk"),
		new webpack.EnvironmentPlugin([
			'NODE_ENV'
		]),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, sourceFolder, "index.html"),
			inject: true,
			filename: path.join(__dirname, distFolder, "index.html"),
		}),
		new ScriptExtHtmlWebpackPlugin({
			sync: "commons.chunk",
			defaultAttribute: 'async'
		}),
		// extractCSS,
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
