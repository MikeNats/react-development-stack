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

		new UglifyJSPlugin(
			{
				compress: {
					sequences     : true,  // join consecutive statemets with the “comma operator”
					properties    : true,  // optimize property access: a["foo"] → a.foo
					dead_code     : true,  // discard unreachable code
					drop_debugger : true,  // discard “debugger” statements
					unsafe        : false, // some unsafe optimizations (see below)
					conditionals  : true,  // optimize if-s and conditional expressions
					comparisons   : true,  // optimize comparisons
					evaluate      : true,  // evaluate constant expressions
					booleans      : true,  // optimize boolean expressions
					loops         : true,  // optimize loops
					unused        : true,  // drop unused variables/functions
					hoist_funs    : true,  // hoist function declarations
					hoist_vars    : false, // hoist variable declarations
					if_return     : true,  // optimize if-s followed by return/continue
					join_vars     : true,  // join var declarations
					cascade       : true,  // try to cascade `right` into `left` in sequences
					side_effects  : true,  // drop side-effect-free statements
					warnings      : true,  // warn about potentially dangerous optimizations/code
					global_defs   : {}     // global definitions
				} //js uglify
	    	}
	    )
	]
}
