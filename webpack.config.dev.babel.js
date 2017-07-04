import path from 'path';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import StyleLintPlugin from 'stylelint-webpack-plugin';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';

export default {

	entry: [

		__dirname + '/src/index.js'
		// the entry point of our app
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.min.js',
		publicPath: '/'
	},
	devtool: 'source-map',
	devServer: {
	    hot: true,
	    // enable HMR on the server

	    contentBase: path.resolve(__dirname),
	    // match the output path

	    publicPath: '/'
	    // match the output `publicPath`
	},
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
				use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: [ 'es2015', 'react', 'react-hmre' ]
                    }
                }],
				exclude: /node_modules/
			},
			{ //sass compilation
				test: /\.scss$/, 
				use: ExtractTextPlugin.extract({
					fallbackLoader: "style-loader",
					loader: "css-loader!sass-loader!postcss-loader",
				}),
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
			minimize: false,
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
			filename: "styles.min.css",
			allChunks: true
		})
	]
}
