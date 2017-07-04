import path from 'path';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import StyleLintPlugin from 'stylelint-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';

export default {
	entry: __dirname + '/src/index.js',
	output: {
		filename: './build/bundle.min.js'
	},
	devtool: false,
	module: {
		rules: [
			{//eslint					
				test: /\.(js|jsx)$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					emitWarning: true,
				}
			},
			{//transpilation
				test: /\.jsx?$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			},
			{ //sass compilation
				test: /\.scss$/, 
				use: ExtractTextPlugin.extract({
					fallbackLoader: "style-loader",
					loader: "css-loader!sass-loader!postcss-loader",
				})
			}
		]
	},
	plugins: [

	 	new StyleLintPlugin({ //sass lint
			configFile: '.stylelintrc.json',
			context: './scss/',
			syntax: 'scss',
			ignoreFiles: [],
			ignorePlugins: [],
			glob: '**/*.s?(a|c)ss',
			quiet: false,
			failOnWarning: true,
			failOnError: true,
			testing: false
		}), 
		
		new webpack.LoaderOptionsPlugin({ //css minification
			minimize: true,
			options: {
				postcss: [autoprefixer({
		          browsers: [
		            'last 3 version',
		            'ie >= 10'
		          ]
		       })]       
			}
		}),
		new ExtractTextPlugin({  //css bundle extraction
			filename: "./build/styles.min.css",
			allChunks: true
		}),

		new UglifyJSPlugin() //js uglify
	]
}
